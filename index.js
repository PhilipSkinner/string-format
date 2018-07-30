const lib = require('./lib/main')();

module.exports = lib.format.bind(lib);