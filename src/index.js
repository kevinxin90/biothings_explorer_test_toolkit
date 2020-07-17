const ids = require("./ids");

module.exports = class {

    getRandomIds(semantic_type, id_type, limit = 100) {
        if (!(semantic_type in ids)) {
            throw new Error(`The input semantic type ${semantic_type} is currently not supported!`)
        }
        if (!(id_type in ids[semantic_type])) {
            throw new Error(`The input id type ${id_type} is currently not supported!`)
        }
        if ((!(typeof limit === "number")) || limit <= 0) {
            throw new Error(`The input limit ${limit} is wrong! Should be an positive integer`)
        }
        if (ids[semantic_type][id_type].length < limit) {
            return ids[semantic_type][id_type];
        } else {
            return ids[semantic_type][id_type].slice(0, limit);
        }
    }
}