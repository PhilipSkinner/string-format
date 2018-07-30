const main = function(parser) {
	this.parser = parser;
};

main.prototype.format = function(template, ...args) {	
	//parse the parts
	const parts = this.parser.getParts(template);

	//generate our string
	return parts.map((p, i) => {
		//its an injector
		if (typeof(p) === 'object') {			
			return p.evaluate(args);
		}

		return p;
	}).join('');
};

module.exports = function(parser) {
	if (!parser) {
		parser = require('./parser')();
	}

	return new main(parser);
};