const currency = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

currency.prototype.format = function(val, options, optionArgs) {
	return this.i18nProvider.getLookup().currencyCode + val.toFixed(optionArgs || 2).replace(".", this.i18nProvider.getLookup().decimalPlace);
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new currency(i18nProvider);
};