const provider = function(lookups) {
	this.lookups = lookups;
	this.defaultList = 'en_US';
};

provider.prototype.getLookup = function() {
	let currentLang = this.defaultList;
	if (process.env.LANG) {
		currentLang = process.env.LANG;
	}

	//normalise
	currentLang = currentLang.split('.')[0].replace(/-/g, '_');

	//does it exist?
	let list = this.lookups[currentLang];

	if (!list) {
		return this.lookups[this.defaultList];
	}

	list = JSON.parse(JSON.stringify(list));

	return Object.assign(JSON.parse(JSON.stringify(this.lookups[this.defaultList])), list);
};

module.exports = function(lookups) {
	if (!lookups) {
		lookups = require("./lookups");
	}

	return new provider(lookups);
};