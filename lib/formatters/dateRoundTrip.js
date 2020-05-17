const dateRoundTrip = function(i18nProvider, dateformat) {
	this.i18nProvider = i18nProvider;
	this.dateformat = dateformat;
};

dateRoundTrip.prototype.format = function(val, options, optionArgs) {
	return val.toISOString();
};

module.exports = function(i18nProvider, dateformat) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!dateformat) {
		dateformat = require('dateformat');
	}

	return new dateRoundTrip(i18nProvider, dateformat);
};