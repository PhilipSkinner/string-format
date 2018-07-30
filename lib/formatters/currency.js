const currency = function() {

};

currency.prototype.format = function(val, alignment, options) {	
	return '$' + val.toFixed(2);
};

module.exports = function() {
	return new currency();
};