/*jshint esversion: 6 */
let count = 0;
var fs = require('fs');
var lineReader = require('readline').createInterface({
  input: fs.createReadStream('IntegerArray.txt')
});

const merge_and_count_split = function(b, c, n) {
	let d = [],
		i = 0,
		j = 0;
	for (let k = 0; k < n; k++) {
		if (b[i] < c[j]) {
			d[k] = b[i];
			i++;
		} else {
			d[k] = c[j];
			count = count + b.length - i;
			j++;
		}
		if (i === b.length && j < c.length) {
			d = d.concat(c.slice(j));
			break;
		}
		if (j === c.length && i < b.length) {
			d = d.concat(b.slice(i));
			break;
		}
	}
	return d;
};

const sort_and_count = function(arr) {
	let n = arr.length;
	if (n === 1) {
		return arr;
	} else {
		const b = sort_and_count(arr.slice(0, n / 2));
		const c = sort_and_count(arr.slice(n / 2));
		const d = merge_and_count_split(b, c, n);

		return d;
	}
};

// var integerArray = fs.readFileSync('IntegerArray.txt').toString().split("\n");
let integerArray = [];
lineReader.on('line', function (line) {
	integerArray.push(parseInt(line, 10));
});
lineReader.on('close', function (line) {
	console.log('Processing...');
	const res = sort_and_count(integerArray);
	var file = fs.createWriteStream('result.txt');
	res.forEach(function(v) { file.write(v + '\n'); });
	file.end();
	console.log('count = ', count);
});
