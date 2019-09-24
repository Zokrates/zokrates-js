import { getAbsolutePath } from './utils';
import stdlib from '../stdlib.json';

const __reserved = ['ecc/', 'signature/', 'hashes/', 'utils/'];
var   __state = {};

export async function initialize(callback) {
  let zokrates = await import('../pkg/index.js');
  __state.zokrates = zokrates;

  window.resolve = function (location, path) {
    return __resolve(location, path, callback);
  }
} 

function __resolve(location, path, callback) {
  let result;
  if (__reserved.some(function (p) { return location.startsWith(p) || path.startsWith(p) })) {
    result = resolveFromStdlib(location, path);
  } else {
    result = callback(location, path);
  }
  if (result) {
    return __state.zokrates.ResolverResult.new(result.source, result.location);
  }
  return null;
}

export function resolveFromStdlib(location, path) {
  let key = getAbsolutePath(location, path);
  if (!key.endsWith('.code')) {
    key = key.concat('.code');
  }
  let source = stdlib[key];
  return source ? { source, location: key } : null;
}

export function getStdLib() {
  return stdlib;
}

export function compile(source, location) {
  if (typeof __state.zokrates === 'undefined') {
    throw new Error("You must call initialize() before calling this method")
  }
  return Uint8Array.from(__state.zokrates.compile(source, location));
}

export function computeWitness(program, args) {
  return __state.zokrates.compute_witness(Array.from(program), Array.from(args));
}

export function setup(program) {
  let result = __state.zokrates.setup(Array.from(program));
  return [result[0], Uint8Array.from(result[1])];
}

export function exportSolidityVerifier(verifyingKey, isAbiv2) {
  return __state.zokrates.export_solidity_verifier(verifyingKey, isAbiv2);
}

export function generateProof(program, witness, provingKey) {
  return __state.zokrates.generate_proof(Array.from(program), witness, Array.from(provingKey));
}