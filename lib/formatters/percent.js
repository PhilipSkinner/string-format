const percent = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

percent.prototype.format = function(val, options, optionArgs) {
	return (val * 100).toFixed(optionArgs || 0).replace('.', this.i18nProvider.getLookup().decimalPlace) + '%';
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new percent(i18nProvider);
};