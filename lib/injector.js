const injector = function(str, currency, decimal, fixed, exponential) {
	//formatters
	this.currency 		= currency;
	this.decimal 		= decimal;
	this.fixed 			= fixed;
	this.exponential 	= exponential;

	//props
	this.str 		= str;
	this.isPlain 	= false;
	this.options 	= null;
	this.optionArgs = null;
	this.alignment 	= null;

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

module.exports = function(currency, decimal, fixed, exponential) {
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

	return function(str) {
		return new injector(str, currency, decimal, fixed, exponential);
	};
};