const injector = function(str, currency) {
	this.currency = currency;

	this.str 		= str;
	this.isPlain 	= false;
	this.options 	= null;
	this.alignment 	= null;

	if (this.str.indexOf(':') !== -1) {
		const p = this.str.split(':');
		this.options = p[1].toLowerCase();
		this.str = p[0];
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

	//get the arg from the position
	const val = args[this.str];	

	//do we have options?	
	if (this.options === 'c') {
		return this.currency.format(val, this.alignment, this.options);
	}	

	return val;
};

module.exports = function(currency) {
	if (!currency) {
		currency = require('./formatters/currency')();
	}

	return function(str) {
		return new injector(str, currency);
	};
};