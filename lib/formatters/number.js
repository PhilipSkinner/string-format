const number = function(i18nProvider, fixed) {
	this.i18nProvider = i18nProvider;
	this.fixed = fixed;
};

number.prototype.format = function(val, options, optionArgs) {
	let decimals = optionArgs || 2;

	if (decimals < 0) {
		decimals = 0;
	}

	let isNegative = val < 0;
	if (isNegative) {
		val = -val;
	}
	let fixed = this.fixed.format(val, options, decimals);
	let parts = fixed.split(this.i18nProvider.getLookup().decimalPlace);
	let newPrefix = '';
	let prefixParts = parts[0].split('');
	for (var i = prefixParts.length - 1; i >= 0; i--) {
		if (i % 3 === 0) {
			newPrefix += this.i18nProvider.getLookup().thousandsSeparator;
		}
		newPrefix += prefixParts[i];
	}

	if (newPrefix.indexOf(this.i18nProvider.getLookup().thousandsSeparator) === 0) {
		newPrefix = newPrefix.slice(1);
	}

	return `${isNegative ? '-' : ''}${newPrefix.split('').reverse().join('')}${parts[1] ? this.i18nProvider.getLookup().decimalPlace : ''}${parts[1]}`;
};

module.exports = function(i18nProvider, fixed) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!fixed) {
		fixed = require("./fixed")();
	}

	return new number(i18nProvider, fixed);
};