const
	jasmine = require("jasmine"),
	stringFormat = require("../index.js");

const notStringIgnoreTest = (done) => {
	expect(stringFormat("{this is my cool value}")).toEqual("{this is my cool value}");

	done();
};

const variableTest = (done) => {
	expect(stringFormat("{0} {1} {2}", "hello", 123, "numbers")).toEqual("hello 123 numbers");

	done();
};

const alignTest = (done) => {
	expect(stringFormat("{0,-6}", "w")).toEqual("     w");
	expect(stringFormat("{0,-6}{0,-6}", "w")).toEqual("     w     w");

	expect(stringFormat("{0,6}", "w")).toEqual("w     ");
	expect(stringFormat("{0,6}{0,6}", "w")).toEqual("w     w     ");

	done();
};

const currencyTest = (done) => {
	process.env.LANG = 'en_GB';

	expect(stringFormat("{0:c}", 3)).toEqual("£3.00");
	expect(stringFormat("{0:C1}", 3)).toEqual("£3.0");
	expect(stringFormat("{0:c0}", 3)).toEqual("£3");

	process.env.LANG = 'en_US';

	expect(stringFormat("{0:c}", 3)).toEqual("$3.00");

	process.env.LANG = 'nl_NL';

	expect(stringFormat("{0:c}", 3)).toEqual("€3,00");

	done();
};

const fixedTest = (done) => {
	process.env.LANG = 'en_GB';

	expect(stringFormat("{0:f}", 3)).toEqual("3.000000");
	expect(stringFormat("{0:F1}", 3.14)).toEqual("3.1");
	expect(stringFormat("{0:f0}", 3)).toEqual("3");

	process.env.LANG = 'nl_NL';

	expect(stringFormat("{0:f}", 3)).toEqual("3,000000");

	done();
};

const decimalsTest = (done) => {
	process.env.LANG = 'en_GB';

	expect(stringFormat("{0:D}", 1234)).toEqual("1234");
	expect(stringFormat("{0:d6}", -1234)).toEqual("-001234");

	done();
};

const exponentialsTest = (done) => {
	process.env.LANG = 'en_GB';

	expect(stringFormat("{0:E}", 1052.0329112756)).toEqual("1.052033E+003");
	expect(stringFormat("{0:e2}", -1052.0329112756)).toEqual("-1.05e+003");

	process.env.LANG = 'fr_FR';

	expect(stringFormat("{0:E}", 1052.0329112756)).toEqual("1,052033E+003");
	expect(stringFormat("{0:e2}", -1052.0329112756)).toEqual("-1,05e+003");

	done();
};

describe("A string formatter", () => {
	it("ignores none strings", notStringIgnoreTest);
	it("can inject variables into a string", variableTest);
	it("can align values", alignTest);
	it("can format currencies", currencyTest);
	it("can format fixed-point numbers", fixedTest);
	it("can format decimals", decimalsTest);
	it("can format exponentials", exponentialsTest);
});
