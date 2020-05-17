const injector = function(
	str,
	currency,
	decimal,
	fixed,
	exponential,
	genericNumber,
	number,
	percent,
	roundTrip,
	hexadecimal,
	shortDate,
	longDate,
	fullDateShortTime,
	fullDateLongTime,
	yearMonth,
	universalFull,
	universalSortable,
	longTime,
	shortTime,
	sortableDate,
	rfc1123,
	dateRoundTrip,
	monthDay,
	generalDateTimeLong,
	generalDateTimeShort
) {
	//formatters
	this.currency 				= currency;
	this.decimal 				= decimal;
	this.fixed 					= fixed;
	this.exponential 			= exponential;
	this.genericNumber  		= genericNumber;
	this.number 				= number;
	this.percent 				= percent;
	this.roundTrip 				= roundTrip;
	this.hexadecimal 			= hexadecimal;
	this.shortDate				= shortDate;
	this.longDate 				= longDate;
	this.fullDateShortTime 		= fullDateShortTime;
	this.fullDateLongTime 		= fullDateLongTime;
	this.yearMonth 				= yearMonth;
	this.universalFull 			= universalFull;
	this.universalSortable 		= universalSortable;
	this.longTime 				= longTime;
	this.shortTime 				= shortTime;
	this.sortableDate 			= sortableDate;
	this.rfc1123 				= rfc1123;
	this.dateRoundTrip 			= dateRoundTrip;
	this.monthDay 				= monthDay;
	this.generalDateTimeLong 	= generalDateTimeLong;
	this.generalDateTimeShort 	= generalDateTimeShort;

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
		if (this.options === 'd') {
			val = this.shortDate.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'D') {
			val = this.longDate.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'f') {
			val = this.fullDateShortTime.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'F') {
			val = this.fullDateLongTime.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'g') {
			val = this.generalDateTimeShort.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'G') {
			val = this.generalDateTimeLong.format(val, this.options, this.optionArgs);
		}

		if (lower === 'm') {
			val = this.monthDay.format(val, this.options, this.optionArgs);
		}

		if (lower === 'o') {
			val = this.dateRoundTrip.format(val, this.options, this.optionArgs);
		}

		if (lower === 'r') {
			val = this.rfc1123.format(val, this.options, this.optionArgs);
		}

		if (this.options === 's') {
			val = this.sortableDate.format(val, this.options, this.optionArgs);
		}

		if (this.options === 't') {
			val = this.shortTime.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'T') {
			val = this.longTime.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'u') {
			val = this.universalSortable.format(val, this.options, this.optionArgs);
		}

		if (this.options === 'U') {
			val = this.universalFull.format(val, this.options, this.optionArgs);
		}

		if (lower === 'y') {
			val = this.yearMonth.format(val, this.options, this.optionArgs);
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

module.exports = function(
	currency,
	decimal,
	fixed,
	exponential,
	genericNumber,
	number,
	percent,
	roundTrip,
	hexadecimal,
	shortDate,
	longDate,
	fullDateShortTime,
	fullDateLongTime,
	yearMonth,
	universalFull,
	universalSortable,
	longTime,
	shortTime,
	sortableDate,
	rfc1123,
	dateRoundTrip,
	monthDay,
	generalDateTimeLong,
	generalDateTimeShort
) {
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

	if (!longDate) {
		longDate = require('./formatters/longDate')();
	}

	if (!fullDateShortTime) {
		fullDateShortTime = require('./formatters/fullDateShortTime')();
	}

	if (!fullDateLongTime) {
		fullDateLongTime = require('./formatters/fullDateLongTime')();
	}

	if (!yearMonth) {
		yearMonth = require('./formatters/yearMonth')();
	}

	if (!universalFull) {
		universalFull = require('./formatters/universalFull')();
	}

	if (!universalSortable) {
		universalSortable = require('./formatters/universalSortable')();
	}

	if (!longTime) {
		longTime = require('./formatters/longTime')();
	}

	if (!shortTime) {
		shortTime = require('./formatters/shortTime')();
	}

	if (!sortableDate) {
		sortableDate = require('./formatters/sortableDate')();
	}

	if (!rfc1123) {
		rfc1123 = require('./formatters/rfc1123')();
	}

	if (!dateRoundTrip) {
		dateRoundTrip = require('./formatters/dateRoundTrip')();
	}

	if (!monthDay) {
		monthDay = require('./formatters/monthDay')();
	}

	if (!generalDateTimeLong) {
		generalDateTimeLong = require('./formatters/generalDateTimeLong')();
	}

	if (!generalDateTimeShort) {
		generalDateTimeShort = require('./formatters/generalDateTimeShort')();
	}

	return function(str) {
		return new injector(
			str,
			currency,
			decimal,
			fixed,
			exponential,
			genericNumber,
			number,
			percent,
			roundTrip,
			hexadecimal,
			shortDate,
			longDate,
			fullDateShortTime,
			fullDateLongTime,
			yearMonth,
			universalFull,
			universalSortable,
			longTime,
			shortTime,
			sortableDate,
			rfc1123,
			dateRoundTrip,
			monthDay,
			generalDateTimeLong,
			generalDateTimeShort
		);
	};
};