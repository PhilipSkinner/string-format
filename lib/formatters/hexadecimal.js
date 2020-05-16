const hexadecimal = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

hexadecimal.prototype.format = function(val, options, optionArgs) {
	let ret = val.toString(16);

	while (ret.length < optionArgs || 0) {
		ret = `0${ret}`;
	}

	return options === 'x' ? ret.toLowerCase() : ret.toUpperCase();
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new hexadecimal(i18nProvider);
};