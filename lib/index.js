'use strict';

const bindings = require('../dist/rdkit.js');

const mPtr = Symbol('Molecule pointer');

class Molecule {
  constructor(ptr) {
    this[mPtr] = ptr;
  }

  static fromSmiles(smiles) {
    return new Molecule(bindings.smilesToMol(smiles));
  }

  toMolfile() {
    return bindings.molToMolfile2D(this[mPtr]);
  }

  delete() {
    this[mPtr].delete();
  }
}

const api = {
  Molecule,
  smilesToMolfile(smiles) {
    const mol = bindings.smilesToMol(smiles);
    const result = bindings.molToMolfile2D(mol);
    mol.delete();
    return result;
  }
};

module.exports = bindings.load().then(() => api);