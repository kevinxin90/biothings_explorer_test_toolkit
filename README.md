[![Build Status](https://travis-ci.com/kevinxin90/biothings_explorer_test_toolkit.svg?branch=master)](https://travis-ci.com/kevinxin90/biothings_explorer_test_toolkit)
Toolkit for generating random biomedical ids for testing biothings explorer related applications
[![Coverage Status](https://coveralls.io/repos/github/kevinxin90/biothings_explorer_test_toolkit/badge.svg?branch=master)](https://coveralls.io/github/kevinxin90/biothings_explorer_test_toolkit?branch=master)
<a href="https://github.com/kevinxin90/biothings_explorer_test_toolkit#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>

# biothings_explorer_test_toolkit

## Install

```
$ npm i @biothings-explorer/biothings_explorer_test_toolkit
```

## Usage

```js
const k = require('@biothings-explorer/biothings_explorer_test_toolkit');

let kit = new k();

// retrieve 10 NCBIGene IDs
kit.getRandomIds("Gene", "NCBIGene", 10);
//=> ["85456", "85461", "85462", "8578", "8622", "8630", "8669", "8761", "8798", "8899"]

// retrieve 60 CHEMBL.COMPOUND IDs
kit.getRandomIds("ChemicalSubstance", "CHEMBL.COMPOUND", 60);
//=> ["CHEMBL.COMPOUND": ["CHEMBL286494", "CHEMBL1321", "CHEMBL404520", "CHEMBL65794", "CHEMBL373081", "CHEMBL100259", "CHEMBL331378", "CHEMBL279229", "CHEMBL826", "CHEMBL2105527", "CHEMBL566", "CHEMBL1201237", "CHEMBL186720", "CHEMBL2103873", "CHEMBL1540", "CHEMBL46469", "CHEMBL1652", "CHEMBL506110", "CHEMBL1371770", ...]

```

## Current supported Semantic Types and Identifier Types

- Gene
  1. NCBIGene
  2. ENSEMBL
  3. HGNC
  4. SYMBOL
  5. UniProtKB
  6. UMLS
  7. name

- SequenceVariant
  1. HGVS
  2. DBSNP
  3. MYVARIANT_HG19
  4. ClinVar

- ChemicalSubstance
    1. CHEBI
    2. CHEMBL.COMPOUND
    3. DRUGBANK
    4. PUBCHEM
    5. MESH
    6. INCHI
    7. INCHIKEY
    8. UNII
    9. KEGG
    10. UMLS
    11. name
    12. id

- Disease

  1. MONDO
  2. DOID
  3. OMIM
  4. ORPHANET
  5. EFO
  6. UMLS
  7. MESH
  8. name
