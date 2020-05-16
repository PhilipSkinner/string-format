const decimal = function(i18nProvider) {
	this.i18nProvider = i18nProvider;
};

decimal.prototype.format = function(val, options, optionArgs) {
	let isNegative = false;
	if (val < 0) {
		isNegative = true;
	}

	if (isNegative) {
		val = -val;
	}

	val = val.toFixed(0) + "";

	if (optionArgs) {
		while (val.length < optionArgs) {
			val = `0${val}`;
		}
	}

	if (isNegative) {
		val = `-${val}`;
	}

	return val;
};

module.exports = function(i18nProvider) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	return new decimal(i18nProvider);
};