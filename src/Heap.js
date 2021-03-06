"use strict";
/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Typescript Math Toolkit: Binary heap that is optimized for nodes with a numerical value and optional data.  The
 * structure may be a min- or max-heap and all operations are supported on either type of heap.  A newly constructed
 * TSMT Heap instance is a min-heap.  Use the type accessor to change the heap type.
 *
 * Each heap node contains a numerical value (externally assigned) and optional Object data (refer to HeapData
 * interface).  An empty Object is created for a node's data if none is provided in an insert operation.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
var HeapType;
(function (HeapType) {
    HeapType[HeapType["MIN"] = 0] = "MIN";
    HeapType[HeapType["MAX"] = 1] = "MAX";
})(HeapType = exports.HeapType || (exports.HeapType = {}));
var TSMT$Heap = (function () {
    /**
     * Create a new Heap
     *
     * @return Nothing
     */
    function TSMT$Heap() {
        this.clear();
        this._type = HeapType.MIN;
    }
    Object.defineProperty(TSMT$Heap.prototype, "size", {
        /**
         * Access the size of the heap
         *
         * @returns {number} Number of elements in the heap
         */
        get: function () {
            return this._position;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$Heap.prototype, "levels", {
        /**
         * Access the number of levels in the heap
         *
         * @returns {number} Integer number of levels in the heap (the final level may not be complete)
         */
        get: function () {
            if (this._position < 2)
                return this._position;
            var log2 = Math.round(Math.log2(this._position));
            return this._position >= Math.pow(2, log2) ? log2 + 1 : log2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TSMT$Heap.prototype, "type", {
        /**
         * Access the heap type
         *
         * @returns {number} HeapType.MIN (min-heap) or HeapType.MAX (max-heap)
         */
        get: function () {
            return this._type;
        },
        /**
         * Assign the heap type
         *
         * @param data: number Either HeapType.MIN or HeapType.MAX
         *
         * @returns nothing The heap type is assigned.  This MUST be performed before any other operation; the heap type may
         * not be changed after data has been addded, although this may be relaxed in the future.
         */
        set: function (data) {
            this._type = data === HeapType.MIN || data === HeapType.MAX ? data : this._type;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Construct a heap from a data array
     *
     * @param data: Array<HeapData> An array of heap data
     *
     * @returns nothing Heap data is inserted from the input array
     */
    TSMT$Heap.prototype.fromArray = function (data) {
        var len = data.length;
        if (len > 0) {
            this.clear();
            var i = void 0;
            for (i = 0; i < len; ++i) {
                // insert elements sequentially
                this.insert(data[i]['value'], data[i]['data']);
            }
        }
    };
    /**
     * Return a copy of the heap as an array
     *
     * @returns {HeapData[]} Copy of the heap.
     */
    TSMT$Heap.prototype.toArray = function () {
        return this._data.slice().splice(1, this._position);
    };
    /**
     * Insert an element into the heap
     *
     * @param x: number Node value
     *
     * @param data: Object Optional data associated with this node
     *
     * @returns nothing The element is inserted into the heap, provided the value is valid and the internal structure
     * is heapified.
     */
    TSMT$Heap.prototype.insert = function (x, data) {
        if (isNaN(x) || !isFinite(x))
            return;
        var nodeData = data || {};
        // no heapify if first value
        if (this._position == 0) {
            this._data[1] = { value: x, data: nodeData };
            this._position = 1;
        }
        else {
            this._data[++this._position] = { value: x, data: nodeData };
            // this is already modified to handle min- or max-heap
            this.__heapifyUp();
        }
    };
    /**
     * Examine the root value of the heap without modifying the internal structure
     *
     * @returns {number} Numerical value of root node, which will be minimum value for a min-heap and maximum value for
     * a max-heap
     */
    TSMT$Heap.prototype.peek = function () {
        if (this._position > 0) {
            // return value of first node
            return this._data[1]['value'];
        }
        else {
            // no data
            return 0;
        }
    };
    /**
     * Extract the root node of the heap
     *
     * @returns {HeapData} Current root node of the heap, provided that there is data in the heap, otherwise null.  The
     * internal structure is heapified after the extraction.
     */
    TSMT$Heap.prototype.extractRoot = function () {
        if (this._data === undefined || this._data.length == 1)
            return null;
        var root = this._data[1];
        this._data[1] = this._data[this._position];
        this._position--;
        if (this._position > 1) {
            // this call handles min- or max-heap
            this.__heapifyDn(1);
        }
        return this._data[1];
    };
    /**
     * Remove a node from the heap based on an input value
     *
     * @param value Numerical value of node to search for and then delete
     *
     * @return nothing The node with the specified value is searched for (within tolerance).  If found, that node is
     * deleted and the internal structure is heapified.  Because of the search, the operation is O(n).  Delete is
     * expected to be an infrequent operation, otherwise another structure is likely a better application fit.
     */
    TSMT$Heap.prototype.delete = function (value) {
        // arbitrary delete should be an infrequent operation, otherwise a binary heap is not the best choice
        // of data structure.  so, this is not as efficient as it could be with more effort.
        if (this._position == 0) {
            // heap is empty; nothing to do
            return;
        }
        // step 1, find
        var index = 0;
        var i;
        for (i = 1; i <= this._position; ++i) {
            if (Math.abs(value - this._data[i]['value']) <= 0.0000001) {
                index = i;
                break;
            }
        }
        // step 2, remove and heapify if necessary - I don't like this, but again, delete is not a common op. for a
        // binary heap.
        if (index != 0) {
            this._data[index] = this._data[this._position];
            this._position--;
            if (this._position <= 1) {
                // heap is empty or a singleton; nothing left to do
                return;
            }
            var parent_1 = Math.round(index / 2);
            // following already handles min- or max-heap
            this.__heapifyDn(index);
        }
    };
    /**
     * Clear the heap and prepare for new data
     *
     * @returns nothing The heap is cleared and prepared for new data, however, the current heap type remains unaltered.
     */
    TSMT$Heap.prototype.clear = function () {
        this._data = new Array();
        this._position = 0;
        this._data.push(null);
    };
    TSMT$Heap.prototype.__heapifyUp = function () {
        var pos = this._position;
        var p2 = Math.floor(0.5 * pos);
        var h;
        if (this._type == HeapType.MIN) {
            while (p2 > 0) {
                if (this._data[p2]['value'] > this._data[pos]['value']) {
                    h = this._data[pos];
                    // swap
                    this._data[pos] = this._data[p2];
                    this._data[p2] = h;
                    pos = p2;
                    p2 = Math.floor(0.5 * pos);
                }
                else {
                    // force quit
                    p2 = 0;
                }
            }
        }
        else {
            while (p2 > 0) {
                if (this._data[p2]['value'] < this._data[pos]['value']) {
                    h = this._data[pos];
                    // swap
                    this._data[pos] = this._data[p2];
                    this._data[p2] = h;
                    pos = p2;
                    p2 = Math.floor(0.5 * pos);
                }
                else {
                    // force quit
                    p2 = 0;
                }
            }
        }
    };
    TSMT$Heap.prototype.__heapifyDn = function (k) {
        var minIndex;
        var maxIndex;
        var left = k + k;
        var right = left + 1;
        if (this._type == HeapType.MIN) {
            if (right > this._position) {
                if (left > this._position) {
                    // all levels tested
                    return;
                }
                else {
                    // set min-index to left as right node position is beyond heap bounds
                    minIndex = left;
                }
            }
            else {
                // compute min-index
                minIndex = (this._data[left]['value'] <= this._data[right]['value']) ? left : right;
            }
            // swap?
            if (this._data[k]['value'] > this._data[minIndex]['value']) {
                var tmp = this._data[minIndex];
                this._data[minIndex] = this._data[k];
                this._data[k] = tmp;
                this.__heapifyDn(minIndex);
            }
        }
        else {
            if (right > this._position) {
                if (left > this._position) {
                    // all levels tested
                    return;
                }
                else {
                    // set min-index to left as right node position is beyond heap bounds
                    maxIndex = left;
                }
            }
            else {
                // compute max-index
                maxIndex = (this._data[left]['value'] >= this._data[right]['value']) ? left : right;
            }
            // swap?
            if (this._data[k]['value'] < this._data[maxIndex]['value']) {
                var tmp = this._data[maxIndex];
                this._data[maxIndex] = this._data[k];
                this._data[k] = tmp;
                this.__heapifyDn(maxIndex);
            }
        }
    };
    return TSMT$Heap;
}());
exports.TSMT$Heap = TSMT$Heap;
