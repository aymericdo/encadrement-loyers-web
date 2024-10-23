export const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
export const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())