const sortableDate = function(i18nProvider, dateformat) {
	this.i18nProvider = i18nProvider;
	this.dateformat = dateformat;
};

sortableDate.prototype.format = function(val, options, optionArgs) {
	return this.dateformat(val, this.i18nProvider.getLookup().sortableDate);
};

module.exports = function(i18nProvider, dateformat) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!dateformat) {
		dateformat = require('dateformat');
	}

	return new sortableDate(i18nProvider, dateformat);
};