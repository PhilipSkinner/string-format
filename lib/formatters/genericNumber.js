const genericNumber = function(i18nProvider, exponential, fixed) {
	this.i18nProvider = i18nProvider;
	this.exponential = exponential;
	this.fixed = fixed;
};

genericNumber.prototype.format = function(val, options, optionArgs) {
	let before = (val + "").split(".")[0].length;
	let decimals = (optionArgs || 7) - before;

	if (decimals < 0) {
		decimals = 0;
	}

	const exp = this.exponential.format(val, options === 'G' ? 'E' : 'e', optionArgs);
	let fixed = this.fixed.format(val, options, decimals);

	//is the fixed accurate?
	if (fixed.split('0').length === decimals + 2) {
		fixed = null;
	}

	return (
		fixed !== null && exp.length > fixed.length
		? fixed
		: exp
	);
};

module.exports = function(i18nProvider, exponential, fixed) {
	if (!i18nProvider) {
		i18nProvider = require("../i18n/provider")();
	}

	if (!exponential) {
		exponential = require("./exponential")();
	}

	if (!fixed) {
		fixed = require("./fixed")();
	}

	return new genericNumber(i18nProvider, exponential, fixed);
};