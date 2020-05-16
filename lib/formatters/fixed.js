const fixed = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

fixed.prototype.format = function(val, options, optionArgs) {
	return val.toFixed(optionArgs || 6).replace(".", this.i18nProvider.getLookup().decimalPlace);
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new fixed(i18nProvider);
};