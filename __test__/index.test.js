const g = require("../src/index");
const ids = require("../src/ids")

describe("Test retrieving id functions", () => {
    let tester;
    beforeEach(() => {
        tester = new g();
    });

    test("Test retrieving Gene NCBIGene IDs", () => {
        let res = tester.getRandomIds("Gene", "NCBIGene", 50);
        expect(res.length).toBe(50);
    });

    test("Test retrieving Variant DBSNP IDs", () => {
        let res = tester.getRandomIds("SequenceVariant", "DBSNP", 50);
        expect(res.length).toBe(50);
        expect(res[0]).toBe("rs189461504");
    });

    test("Test retrieving Chemical CHEMBL.COMPOUND IDs", () => {
        let res = tester.getRandomIds("ChemicalSubstance", "CHEMBL.COMPOUND", 50);
        expect(res.length).toBe(50);
        expect(res[0]).toBe("CHEMBL286494");
    });

    test("Test retrieving Disease MONDO IDs", () => {
        let res = tester.getRandomIds("Disease", "MONDO", 50);
        expect(res.length).toBe(50);
        expect(res[0]).toBe("MONDO:0003011");
    });

    test("Test retrieving Disease MONDO IDs", () => {
        let res = tester.getRandomIds("Disease", "MONDO", 50);
        expect(res.length).toBe(50);
        expect(res[0]).toBe("MONDO:0003011");
    });

    test("Test when asking for more ids than can provide", () => {
        let res = tester.getRandomIds("Disease", "MONDO", 10000);
        expect(res.length).toBe(ids.Disease.MONDO.length);
    });

    test("Test when given wrong semantic type", () => {
        function wrongSemanticType() {
            tester.getRandomIds("Disease1", "MONDO", 50);
        }
        expect(wrongSemanticType).toThrowError(new Error("The input semantic type Disease1 is currently not supported!"));
    })

    test("Test when given wrong id type", () => {
        function wrongID() {
            tester.getRandomIds("Disease", "MONDO1", 50);
        }

        expect(wrongID).toThrowError(new Error("The input id type MONDO1 is currently not supported!"));
    })

    test("Test when given wrong limit", () => {
        function wrongLimit() {
            tester.getRandomIds("Disease", "MONDO", -1);
        }

        expect(wrongLimit).toThrowError(new Error("The input limit -1 is wrong! Should be an positive integer"));
    })

})
