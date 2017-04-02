/* jshint esversion: 6 */

var _ = require('lodash');

function Vertex(label, adjacency) {
	this.label = label;
	this.adjacency = adjacency;
	this.mergedVertices = [];
}

// takes an array of objects with {label, adjacency}
function Graph(arr) {
	this.heap = [];
	if (arr)
		for (i = 0; i < arr.length; i++)
			this.push(arr[i].label, arr[i].adjacency);
}

Graph.prototype = {
	push: function(label, adjacency) {
		this.heap.push(new Vertex(label, adjacency));
	},

	merge: function(aIndex, bIndex) {
		// console.log('this.heap[aIndex] = ', this.heap[aIndex]);
		// console.log('this.heap[bIndex] = ', this.heap[bIndex]);
		let labelA = this.heap[aIndex].label;
		let labelB = this.heap[bIndex].label;
		this.heap[aIndex].mergedVertices = _.concat(this.heap[aIndex].mergedVertices, this.heap[bIndex].mergedVertices, [labelB]);
		for (let i = this.heap.length - 1; i >= 0; i--) {
			if (i === aIndex) {
				for (let j = this.heap[i].adjacency.length - 1; j >= 0; j--) {
					if (this.heap[i].adjacency[j] === labelB) { // Note: must check for labelA too if there was self-loops in the original array
						this.heap[i].adjacency.splice(j, 1);
					}
				}
			} else if (i === bIndex) {
				for (let j = this.heap[i].adjacency.length - 1; j >= 0; j--) {
					if (this.heap[i].adjacency[j] === labelA) { // Note: must check for labelB too if there was self-loops in the original array
						this.heap[i].adjacency.splice(j, 1);
					}
				}
			} else {
				for (let j = this.heap[i].adjacency.length - 1; j >= 0; j--) {
					if (this.heap[i].adjacency[j] === labelB) {
						this.heap[i].adjacency[j] = labelA;
					}
				}
			}
		}
		this.heap[aIndex].adjacency = _.concat(this.heap[aIndex].adjacency, this.heap[bIndex].adjacency);
		this.heap.splice(bIndex, 1);
	},

	getIndex: function(label) {
		for (let i = this.heap.length - 1; i >= 0; i--) {
			if (this.heap[i].label === label) {
				return i;
			}
		}
	}
};


exports.graph = function(arr) {
	var graph = new Graph(arr);
	return graph;
}

// export function graph(arr) {
// 	var graph = new Graph(arr);
// 	return graph;
// }