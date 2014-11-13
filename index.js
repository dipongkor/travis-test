var version = require('./version');
process.version  = version.version;
process.versions = version.versions;
module.exports = version;
