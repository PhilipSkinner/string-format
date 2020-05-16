const roundTrip = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

roundTrip.prototype.format = function(val, options, optionArgs) {
	return val + "";
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new roundTrip(i18nProvider);
};