const axios = require("axios");
const config = require("./config");
const fs = require("fs");
const dot = require("@arg-def/dot-notation");

/**
 * Construct the first query to biothings API
 * @param {string} semantic_type - semantic type
 * @param {string} field - corresponding field name of the identifier
 */
const constructInitialBioThingsQuery = (semantic_type, field) => {
    return axios({
        method: 'get',
        url: config.APIMETA[semantic_type].url,
        params: {
            q: `_exists_:${field}`,
            fields: `${field}`,
            fetch_all: true,
            dotfield: true,
            species: "human"
        }
    })
}

/**
 * Retrieve scrolling response from BioThings APIs
 * @param {string} semantic_type - semantic type
 * @param {string} scroll_id - scroll_id to be passed to biothings API
 */
const constructScrollBioThingsQuery = (semantic_type, scroll_id) => {
    return axios({
        method: 'get',
        url: config.APIMETA[semantic_type].url,
        params: {
            scroll_id: scroll_id
        }
    })
}

/**
 * Parse API Response from BioThings API
 * @param {object} res - api response
 * @param {string} field - corresponding field name of the identifier
 * @param {boolean} scroll - indicate whether the response is from scroll query or initial query
 */
const parseBioThingsResult = (res, field, scroll = false) => {
    const scroll_id = res["_scroll_id"];
    let ids = new Set();
    if ("hits" in res) {
        res.hits.map(item => {
            if (field in item) {
                if (scroll === false) {
                    ids.add(item[field])
                } else {
                    ids.add(dot.pick(field, item))
                }
            }
        })
    }
    return {
        scroll_id: scroll_id,
        ids: ids
    }
}

/**
 * Main function to query for random ids using BioThings APIs
 */
const query = async () => {
    let result = {};
    for (let semantic_type of Object.keys(config.APIMETA)) {
        result[semantic_type] = {};
        for (let id_type of Object.keys(config.APIMETA[semantic_type].mapping)) {
            let field_name = config.APIMETA[semantic_type].mapping[id_type][0];
            let response = await constructInitialBioThingsQuery(semantic_type, field_name);
            let res = parseBioThingsResult(response.data, field_name);
            result[semantic_type][id_type] = Array.from(res.ids);
            for (let i of [...Array(4).keys()]) {
                response = await constructScrollBioThingsQuery(semantic_type, res.scroll_id);
                res = parseBioThingsResult(response.data, field_name, scroll = true);
                result[semantic_type][id_type] = [...result[semantic_type][id_type], ...Array.from(res.ids)];
            }
            console.log(`finished ${semantic_type} and ${id_type}`)
        }
    }
    fs.writeFile("ids.json", JSON.stringify(result), function (err) {
        if (err) throw err;
        console.log('complete');
    }
    );
    return result;
}

module.exports = query;