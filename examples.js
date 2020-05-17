const stringFormat = require("./index.js");

process.env.LANG = 'en_GB';

console.log(
	[
		// general
		stringFormat("{0} {1}: {0}", "The", "first value is"), 				// positional arguments
		stringFormat("{0,-10}", "padded"),									// left padded alignment
		stringFormat("{0,10}hello", "world"),								// right padded alignment

		// numbers
		stringFormat("{0:c}", 3.14),										// currency, supports decimal places {0:c4}
		stringFormat("{0:f4}", 1.23456),									// fixed point, defaults to 6 places if no arg given
		stringFormat("{0:d4}", 12),											// zero padded number
		stringFormat("{0:e2}", -1052.0329112756),							// exponential
		stringFormat("{0:G4}", 123.4546),									// general number format
		stringFormat("{0:N}", 1234567890),									// human natural
		stringFormat("{0:P}", 0.12),										// percentage
		stringFormat("{0:R}", 1.23),										// round trip number
		stringFormat("{0:x4}", 255),										// hexadecimal

		// dates/times
		stringFormat("{0:d}", new Date()),									// short date format - 20/01/2020 UK, 1/20/2020 USA
		stringFormat("{0:D}", new Date()),									// long date format - Wednesday, January 1, 2020
		stringFormat("{0:f}", new Date()),									// full date short time - Wednesday, January 1, 2020 1:34 PM
		stringFormat("{0:F}", new Date()),									// full date long time - Wednesday, January 1, 20202 1:34:45 PM
		stringFormat("{0:Y}", new Date()), 									// year month - January 2020
		stringFormat("{0:M}", new Date()), 									// day month - January 1
		stringFormat("{0:u}", new Date()), 									// universal sortable - 01-01-2020 13:34:45Z
		stringFormat("{0:t}", new Date()), 									// short time - 1:34 PM
		stringFormat("{0:T}", new Date()), 									// long time - 1:34:45 PM
		stringFormat("{0:R}", new Date()),									// RFC1123 - Wed, 1 Jan 2020 13:34:45
		stringFormat("{0:O}", new Date()), 									// round trip
		stringFormat("{0:g}", new Date()), 									// general short time - 20/01/2020 1:34 PM
		stringFormat("{0:G}", new Date()), 									// general long time - 20/01/2020 1:34:45 PM
	].join("\n")
);