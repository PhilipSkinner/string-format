const exponential = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

exponential.prototype.format = function(val, options, optionArgs) {
	if (!optionArgs) {
		optionArgs = 6;
	}

	let isNegative = false;
	if (val < 0) {
		isNegative = true;
		val = -val;
	}

	let exponant = 0;
	while (val > 10) {
		val /= 10;
		exponant++;
	}

	while (val < 1) {
		val *= 10;
		exponant--;
	}

	//pad the exponant
	exponant = exponant + "";
	while (exponant.length < 3) {
		exponant = `0${exponant}`;
	}

	//lets round it up
	val = Math.round(val * (10 ** optionArgs)) / (10 ** optionArgs);

	return `${isNegative ? '-' : ''}${val}${options}${exponant > 0 ? '+' : ''}${exponant}`.replace(".", this.i18nProvider.getLookup().decimalPlace);
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new exponential(i18nProvider);
};