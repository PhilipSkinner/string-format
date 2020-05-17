# Elemental String Formatter

Can be used standalone, though this library was developed to add missing functionality into the (Elemental Low-code platform)[https://elementalsystem.org].

This library provides the ability to format strings in the same way as String.Format in .NET.

Basic usage:

```
const stringFormat = require("elemental-string-format");

process.env.LANG = 'en_GB';

console.log(
	[
		// general
		stringFormat("{0} {1}: {0}", "The", "first value is"), 				// positional arguments - The first value is: The
		stringFormat("{0,-10}", "padded"),									// left padded alignment -     padded
		stringFormat("{0,10}hello", "world"),								// right padded alignment - world     hello

		// numbers
		stringFormat("{0:c}", 3.14),										// currency, supports decimal places {0:c4} - £3.14
		stringFormat("{0:f4}", 1.23456),									// fixed point, defaults to 6 places if no arg given - 1.2346
		stringFormat("{0:d4}", 12),											// zero padded number - 0012
		stringFormat("{0:e2}", -1052.0329112756),							// exponential - -1.05e+003
		stringFormat("{0:G4}", 123.4546),									// general number format - 123.5
		stringFormat("{0:N}", 1234567890),									// human natural - 1,234,567,890.00
		stringFormat("{0:P}", 0.12),										// percentage - 12%
		stringFormat("{0:R}", 1.23),										// round trip number - 1.23
		stringFormat("{0:x4}", 255),										// hexadecimal - 00ff

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
```