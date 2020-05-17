const monthDay = function(i18nProvider, dateformat) {
	this.i18nProvider = i18nProvider;
	this.dateformat = dateformat;
};

monthDay.prototype.format = function(val, options, optionArgs) {
	return this.dateformat(val, this.i18nProvider.getLookup().monthDay);
};

module.exports = function(i18nProvider, dateformat) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!dateformat) {
		dateformat = require('dateformat');
	}

	return new monthDay(i18nProvider, dateformat);
};