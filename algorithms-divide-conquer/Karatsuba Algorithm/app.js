/*jshint esversion: 6 */
var bigInt = require("big-integer");

const karatsuba = function(x, y) {
	const n = x.length;
	if (n <= 25) {
		return bigInt(x).multiply(y);
	}
	const a = x.substring(0, n / 2);
	const b = x.substring(n / 2);
	const c = y.substring(0, n / 2);
	const d = y.substring(n / 2);
	const aPlusB = bigInt(a).add(b).toString();
	const cPlusD = bigInt(c).add(d).toString();
	
	const ac = karatsuba(a, c);
	const bd = karatsuba(b, d);
	const firstTerm = bigInt(10).pow(n).multiply(ac);
	const secondTerm = bigInt(10).pow(n / 2).multiply(karatsuba(aPlusB, cPlusD).subtract(ac.plus(bd)));
	return firstTerm.add(secondTerm).add(bd);
};

if (isNaN(process.argv[2]) || isNaN(process.argv[3])) {
	console.log('Please input two space separated numbers as inputs to the program in order to get the result of their multiplication using Karatsuba Multiplication');
} else {
	const res = karatsuba(process.argv[2], process.argv[3]);
	console.log('Multiplication result is: ', res.toString());
}