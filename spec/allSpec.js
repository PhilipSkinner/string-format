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
	expect(stringFormat("{0:N}", 1234567890)).toEqual("1,234,567,890.00");

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

const shortDateFormat = (done) => {
	process.env.LANG = 'en_US';

	var d = new Date(2020, 0, 1);
	expect(stringFormat("{0:d}", d)).toEqual("01/1/2020");

	done();
};

const longDateFormat = (done) => {
	process.env.LANG = 'en_US';

	var d = new Date(2020, 0, 1);
	expect(stringFormat("{0:D}", d)).toEqual("Wednesday, January 1, 2020");

	done();
};

const fullDateShortTimeFormat = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:f}", d)).toEqual("Wednesday, January 1, 2020 1:34 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:f}", d)).toEqual("den 1 January 2020 13:34");

	done();
};

const fullDateLongTimeFormat = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:F}", d)).toEqual("Wednesday, January 1, 2020 1:34:45 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:F}", d)).toEqual("den 1 January 2020 13:34:45");

	done();
};

const yearMonthTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:Y}", d)).toEqual("January 2020");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:y}", d)).toEqual("January 2020");

	done();
};

const universalFullTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:U}", d)).toEqual("Wednesday, January 1, 2020 1:34:45 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:U}", d)).toEqual("Wednesday, January 1, 2020 1:34:45 PM");

	done();
};

const universalSortableTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:u}", d)).toEqual("2020-01-01 13:34:45Z");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:u}", d)).toEqual("2020-01-01 13:34:45Z");

	done();
};

const longTimeTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:T}", d)).toEqual("1:34:45 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:T}", d)).toEqual("13:34:45");

	done();
};

const shortTimeTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:t}", d)).toEqual("1:34 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:t}", d)).toEqual("13:34");

	done();
};

const rfc1123Test = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:R}", d)).toContain("Wed, 1 Jan 2020 13:34:45");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:R}", d)).toContain("Wed, 1 Jan 2020 13:34:45");

	done();
};

const roundTripDateTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:O}", d)).toEqual(stringFormat("{0:o}", new Date(stringFormat("{0:O}", d))));

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:O}", d)).toEqual(stringFormat("{0:o}", new Date(stringFormat("{0:O}", d))));

	done();
};

const monthDayTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:M}", d)).toEqual("January 1");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:m}", d)).toEqual("January 1");

	done();
};

const generalLongTimeTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:G}", d)).toEqual("01/1/2020 1:34:45 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:G}", d)).toEqual("01/01/2020 13:34:45");

	done();
};

const generalShortTimeTest = (done) => {
	process.env.LANG = 'en_US';

	let d = new Date(2020, 0, 1, 13, 34, 45);
	expect(stringFormat("{0:g}", d)).toEqual("01/1/2020 1:34 PM");

	process.env.LANG = 'sv_SE';

	expect(stringFormat("{0:g}", d)).toEqual("01/01/2020 13:34");

	done();
};

describe("A string formatter", () => {
	it("ignores none strings", notStringIgnoreTest);

	/* number tests */
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

	/* date tests */
	it("can format short dates", shortDateFormat);
	it("can format long dates", longDateFormat);
	it("can format full dates with short time", fullDateShortTimeFormat);
	it("can format full dates with long time", fullDateLongTimeFormat);
	it("can format year month", yearMonthTest);
	it("can format universal full", universalFullTest);
	it("can format universal sortable", universalSortableTest);
	it("can format long time", longTimeTest);
	it("can format short time", shortTimeTest);
	it("can format rfc1123", rfc1123Test);
	it("can round trip dates", roundTripDateTest);
	it("can format month day", monthDayTest);
	it("can format general long time", generalLongTimeTest);
	it("can format general short time", generalShortTimeTest);
});
