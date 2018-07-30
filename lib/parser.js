const parser = function(injector) {
	this.injector = injector;
};

parser.prototype.generateObj = function(str) {
	return new this.injector(str);
};

parser.prototype.getParts = function(template) { 	
	const copy = template + '';
	let inIdentifier = false;		
	let current = '';
	return copy.split('').reduce((sum, chr, i, w) => {
		if (chr === '{') {
			if (current !== '') {
				sum.push(current);	
			}
			
			inIdentifier = true;
			current = '';			
		} else if (chr === '}' && inIdentifier) {
			sum.push(this.generateObj(current));
			inIdentifier = false;
			current = '';
		} else {
			current += chr;
		}

		if (i === w.length -1) {
			if (current !== '') {
				sum.push(current);
			}
		}

		return sum;
	}, []);
};

module.exports = function(injector) {
	if (!injector) {
		injector = require('./injector')();
	}

	return new parser(injector);
};