const rfc1123 = function(i18nProvider, dateformat) {
	this.i18nProvider = i18nProvider;
	this.dateformat = dateformat;
};

rfc1123.prototype.format = function(val, options, optionArgs) {
	return this.dateformat(val, this.i18nProvider.getLookup().rfc1123);
};

module.exports = function(i18nProvider, dateformat) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!dateformat) {
		dateformat = require('dateformat');
	}

	return new rfc1123(i18nProvider, dateformat);
};