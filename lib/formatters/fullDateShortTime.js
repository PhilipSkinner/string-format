const fullDateShortTime = function(i18nProvider, dateformat) {
	this.i18nProvider = i18nProvider;
	this.dateformat = dateformat;
};

fullDateShortTime.prototype.format = function(val, options, optionArgs) {
	return this.dateformat(val, this.i18nProvider.getLookup().fullDateShortTime);
};

module.exports = function(i18nProvider, dateformat) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!dateformat) {
		dateformat = require('dateformat');
	}

	return new fullDateShortTime(i18nProvider, dateformat);
};