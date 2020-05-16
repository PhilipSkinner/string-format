const injector = function(str, currency, decimal, fixed, exponential, genericNumber, number, percent, roundTrip, hexadecimal, shortDate) {
	//formatters
	this.currency 		= currency;
	this.decimal 		= decimal;
	this.fixed 			= fixed;
	this.exponential 	= exponential;
	this.genericNumber  = genericNumber;
	this.number 		= number;
	this.percent 		= percent;
	this.roundTrip 		= roundTrip;
	this.hexadecimal 	= hexadecimal;
	this.shortDate		= shortDate;

	//props
	this.str 		= str;
	this.isPlain 	= false;
	this.options 	= null;
	this.optionArgs = null;
	this.alignment 	= null;
	this.isNumber 	= false;

	if (this.str.indexOf(':') !== -1) {
		const p = this.str.split(':');
		this.options = p[1];
		this.str = p[0];
	}

	if (this.options && this.options.length > 1) {
		//we have optionArgs
		this.optionArgs = this.options.split('').slice(-1).join('');
		this.options = this.options.slice(0, 1);
	}

	//got an alignment?
	if (this.str.indexOf(',') !== -1) {
		const p = this.str.split(',');
		this.alignment = p[1];
		this.str = p[0];
	}

	//ensure that we are an integer
	if (parseInt(this.str) + '' !== this.str) {
		//just act like a plain string
		this.isPlain = true;
		this.str = str;
	} else {
		this.str = parseInt(this.str);
	}
};

injector.prototype.evaluate = function(args) {
	if (this.isPlain) {
		return '{' + this.str + '}';
	}

	let lower = this.options && this.options.toLowerCase ? this.options.toLowerCase() : this.options;

	//get the arg from the position
	let val = args[this.str];

	if (typeof(val) === "number") {
		//do we have options?
		if (lower === 'c') {
			val = this.currency.format(val, this.options, this.optionArgs);
		}

		if (lower === 'd') {
			val = this.decimal.format(val, this.options, this.optionArgs);
		}

		if (lower === 'f') {
			val = this.fixed.format(val, this.options, this.optionArgs);
		}

		if (lower === 'e') {
			val = this.exponential.format(val, this.options, this.optionArgs);
		}

		if (lower === 'g') {
			val = this.genericNumber.format(val, this.options, this.optionArgs);
		}

		if (lower === 'n') {
			val = this.number.format(val, this.options, this.optionArgs);
		}

		if (lower === 'p') {
			val = this.percent.format(val, this.options, this.optionArgs);
		}

		if (lower === 'r') {
			val = this.roundTrip.format(val, this.options, this.optionArgs);
		}

		if (lower === 'x') {
			val = this.hexadecimal.format(val, this.options, this.optionArgs);
		}
	}

	if (typeof(val) === "object") {
		if (lower === 'd') {
			val = this.shortDate.format(val, this.options, this.optionArgs);
		}
	}

	//does it need alignment?
	if (this.alignment) {
		if (this.alignment < 0) {
			while (val.length < -this.alignment) {
				val = ` ${val}`;
			}
		} else if (this.alignment > 1) {
			while (val.length < this.alignment) {
				val = `${val} `;
			}
		}
	}

	return val;
};

module.exports = function(currency, decimal, fixed, exponential, genericNumber, number, percent, roundTrip, hexadecimal, shortDate) {
	if (!currency) {
		currency = require('./formatters/currency')();
	}

	if (!decimal) {
		decimal = require('./formatters/decimal')();
	}

	if (!fixed) {
		fixed = require('./formatters/fixed')();
	}

	if (!exponential) {
		exponential = require('./formatters/exponential')();
	}

	if (!genericNumber) {
		genericNumber = require('./formatters/genericNumber')();
	}

	if (!number) {
		number = require('./formatters/number')();
	}

	if (!percent) {
		percent = require('./formatters/percent')();
	}

	if (!roundTrip) {
		roundTrip = require('./formatters/roundTrip')();
	}

	if (!hexadecimal) {
		hexadecimal = require('./formatters/hexadecimal')();
	}

	if (!shortDate) {
		shortDate = require('./formatters/shortDate')();
	}

	return function(str) {
		return new injector(str, currency, decimal, fixed, exponential, genericNumber, number, percent, roundTrip, hexadecimal, shortDate);
	};
};