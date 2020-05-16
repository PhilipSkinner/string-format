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

const genericNumberTest = (done) => {
	process.env.LANG = 'en_US';

	expect(stringFormat("{0:G}", -123.456)).toEqual("-123.456");
	expect(stringFormat("{0:G}", -1.234567890e-25)).toEqual("-1.234568E-25");
	expect(stringFormat("{0:G4}", 123.4546)).toEqual("123.5");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:G}", -123.456)).toEqual("-123,456");
	expect(stringFormat("{0:G}", -1.234567890e-25)).toEqual("-1,234568E-25");
	expect(stringFormat("{0:G4}", 123.4546)).toEqual("123,5");

	done();
};

const numbersTest = (done) => {
	process.env.LANG = 'en_US';

	expect(stringFormat("{0:N}", 1234.567)).toEqual("1,234.57");
	expect(stringFormat("{0:N1}", 1234)).toEqual("1,234.0");
	expect(stringFormat("{0:N3}", -1234.56)).toEqual("-1,234.560");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:N}", 1234.567)).toEqual("1.234,57");
	expect(stringFormat("{0:N1}", 1234)).toEqual("1.234,0");
	expect(stringFormat("{0:N3}", -1234.56)).toEqual("-1.234,560");

	done();
};

const percentagesTest = (done) => {
	process.env.LANG = 'en_US';

	expect(stringFormat("{0:P}", 0.12)).toEqual("12%");
	expect(stringFormat("{0:P1}", 0.1234)).toEqual("12.3%");
	expect(stringFormat("{0:P3}", 0.123456)).toEqual("12.346%");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:P}", 0.12)).toEqual("12%");
	expect(stringFormat("{0:P1}", 0.1234)).toEqual("12,3%");
	expect(stringFormat("{0:P3}", 0.123456)).toEqual("12,346%");

	done();
};

const roundTripTest = (done) => {
	process.env.LANG = 'en_US';

	expect(stringFormat("{0:R}", 0.12)).toEqual("0.12");
	expect(stringFormat("{0:r}", 0.1234)).toEqual("0.1234");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:R}", 0.12)).toEqual("0.12");
	expect(stringFormat("{0:r}", 0.1234)).toEqual("0.1234");

	done();
};

const hexTest = (done) => {
	process.env.LANG = 'en_US';

	expect(stringFormat("{0:x}", 255)).toEqual("ff");
	expect(stringFormat("{0:X4}", 255)).toEqual("00FF");

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
	it("can format generic numbers", genericNumberTest);
	it("can format numbers", numbersTest);
	it("can format percentages", percentagesTest);
	it("can do round trip number formats", roundTripTest);
	it("can format hexadecimals", hexTest);
});
