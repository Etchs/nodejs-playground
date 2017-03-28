/*jshint esversion: 6 */
let count = 0;
var fs = require('fs');
var lineReader = require('readline').createInterface({
	input: fs.createReadStream('QuickSort.txt')
});

const choosePivot = function(arr, s, f, type) {
	switch (type) {
		case 'first':
			return s;
		case 'last':
			return f - 1;
		case 'median':
			const n = f - 1;
			let h = s + Math.floor((f - s) / 2);
			h = ( (f-s) & 1 ) ? h : h-1;
			if ((arr[s] < arr[n] && arr[s] > arr[h]) || (arr[s] > arr[n] && arr[s] < arr[h])) {
				return s;
			} else if ((arr[n] < arr[s] && arr[n] > arr[h]) || (arr[n] > arr[s] && arr[n] < arr[h])) {
				return n;
			} else if ((arr[h] < arr[n] && arr[h] > arr[s]) || (arr[h] > arr[n] && arr[h] < arr[s])) {
				return h;
			}
			break;
		default:
			return s;
	}
};

const quicksort = function(arr, start, finish) {
	let n = finish - start;
	if (n === 1 || n === 0) {
		return;
	} else {
		count = count + n - 1;
		const pi = choosePivot(arr, start, finish, 'median'); // pivot index
		if (pi !== start) {
			const tmp = arr[pi];
			arr[pi] = arr[start];
			arr[start] = tmp;
		}
		let i = start + 1;
		for (var j = i; j < finish; j++) {
			if (arr[start] > arr[j]) {
				const temp = arr[i];
				arr[i++] = arr[j];
				arr[j] = temp;
			}
		}
		const t = arr[start];
		arr[start] = arr[(i - 1)];
		arr[(i - 1)] = t;
		quicksort(arr, start, i - 1);
		quicksort(arr, i, j);
	}
};


let integerArray = [];
lineReader.on('line', function(line) {
	integerArray.push(parseInt(line, 10));
});
lineReader.on('close', function(line) {
	console.log('Processing...');
	quicksort(integerArray, 0, integerArray.length);
	var file = fs.createWriteStream('result.txt');
	integerArray.forEach(function(v) {
		file.write(v + '\n');
	});
	file.end();
	console.log('count = ', count);
});