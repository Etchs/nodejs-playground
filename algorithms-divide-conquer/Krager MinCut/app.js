/* jshint esversion: 6 */
var _ = require('lodash');
const graphFactory = require('./GraphFactory');
var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream('kargerMinCut.txt')
});

const kragerMinCut = function(vertices) {
	let graph = graphFactory.graph(vertices);
	while (graph.heap.length > 2) {
		const aIndex = Math.round(Math.random() * (graph.heap.length - 1));
		const aAdjacency = graph.heap[aIndex].adjacency;
		const lIndex = Math.round(Math.random() * (aAdjacency.length - 1))
		const bLabel = graph.heap[aIndex].adjacency[lIndex];
		if(!bLabel) {
			console.log('aIndex = ', aIndex);
			console.log('lIndex = ', lIndex);
			console.log('graph.heap[aIndex] = ', graph.heap[aIndex]);
			console.log('graph.heap[aIndex].adjacency.length = ', graph.heap[aIndex].adjacency.length);
			console.log('graph.heap[aIndex].adjacency = ', graph.heap[aIndex].adjacency);
		}
		const bIndex = graph.getIndex(bLabel);
		graph.merge(aIndex, bIndex);
	}
	// console.log('graph.heap = ', graph.heap);
	// console.log('graph.heap[0].adjacency.length = ', graph.heap[0].adjacency.length);
	// console.log('graph.heap[1].adjacency.length = ', graph.heap[1].adjacency.length);
	// console.log('graph.heap[0].adjacency = ', graph.heap[0].adjacency);
	// console.log('graph.heap[1].adjacency = ', graph.heap[1].adjacency);
	return graph.heap[0].adjacency.length;
};

let vertices = [];
lineReader.on('line', function(line) {
	let lineArray = line.split("	");
	let vertex = {
		label: parseInt(lineArray[0], 10),
		adjacency: []
	}
	for (var i = lineArray.length - 2; i > 0; i--) { // ignore lineArray.length - 1 due to extra spacing at the end of each line
		vertex.adjacency.push(parseInt(lineArray[i], 10));
	}
	vertices.push(vertex);
});
lineReader.on('close', function(line) {
	const n = vertices.length;
	let minCut = vertices.length - 1; // maximum value for minimum cut
	// const k = kragerMinCut(vertices);
	for (let i = Math.floor(Math.pow(n, 2) * Math.log(n)); i > 0; i--) {
		const k = kragerMinCut(_.cloneDeep(vertices));
		if (minCut>k){
			minCut = k;
		}
	}
	console.log('minCut = ', minCut);
});