/** Copyright 2016 Jim Armstrong (www.algorithmist.net)
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

// Specs for various alpha release of TSMT Binary Heap data structure
import {TSMT$Heap} from '../src/Heap';
import {HeapData } from '../src/Heap';
import {HeapType } from '../src/Heap';

import * as Chai from 'chai';
const expect = Chai.expect;

// Test Suites
describe('TSMT Heap Tests', () => {

  it('newly constructed Heap has size of zero', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    expect(heap.size).to.equal(0);
  });

  it('newly constructed Heap is a min-heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    expect(heap.type).to.equal(HeapType.MIN);
  });

  it('will not accept invalid heap type setting', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.type = -1;

    expect(heap.type).to.equal(HeapType.MIN);
  });

  it('properly assigns a singleton element', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(1);
    expect(element).to.equal(1.0);
  });

  it('2-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(1.0);
  });

  it('2-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(1.0);
  });

  it('3-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0)
    heap.insert(2.0);
    heap.insert(3.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(1.0);
  });

  it('3-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(1.0);
  });

  it('3-element insert test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(2.0)
    heap.insert(1.0);
    heap.insert(3.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(1.0);
  });

  it('multi-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(6);
    expect(element).to.equal(1.0);
  });

  it('toArray returns copy of heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let curHeap: Array<HeapData> = heap.toArray();

    expect(curHeap[0]['value']).to.equal(1.0);
  });

  it('multi-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);
    heap.insert(7.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(7);
    expect(element).to.equal(1.0);

    let curHeap: Array<HeapData> = heap.toArray();
    expect(curHeap[heap.size-1]['value']).to.equal(7);
  });

  it('multi-element insert test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(2.0);
    heap.insert(4.0);
    heap.insert(3.0);
    heap.insert(9.0);
    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(10.0);
    heap.insert(14.0);
    heap.insert(6.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(1.0);
  });

  it('multi-element insert test #4', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(7.0);
    heap.insert(8.0);
    heap.insert(9.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(1.0);
  });

  it('multi-element insert test #5', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(9.0);
    heap.insert(8.0);
    heap.insert(7.0);
    heap.insert(6.0);
    heap.insert(5.0);
    heap.insert(4.0);
    heap.insert(3.0);
    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(1.0);
  });

  it('levels accessor test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    expect(heap.levels).to.equal(0);
  });

  it('levels accessor test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);

    expect(heap.levels).to.equal(1);
  });

  it('levels accessor test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);

    expect(heap.levels).to.equal(2);
  });

  it('levels accessor test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    expect(heap.levels).to.equal(2);
  });

  it('levels accessor test #4', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);

    expect(heap.levels).to.equal(3);
  });

  it('levels accessor test #5', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);
    heap.insert(5.0);

    expect(heap.levels).to.equal(3);
  });

  it('levels accessor test #6', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);
    heap.insert(5.0);
    heap.insert(6.0);

    expect(heap.levels).to.equal(3);
  });

  it('levels accessor test #8', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(7.0);
    heap.insert(8.0);

    expect(heap.levels).to.equal(4);
  });

  it('properly removes min element from heap #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();
    expect(element).to.equal(1.0);

    let min: HeapData = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(5);
    expect(element).to.equal(3);
  });

  it('properly removes min element from heap #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();
    expect(element).to.equal(1.0);

    let min: HeapData = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(5);
    expect(element).to.equal(3);

    min     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(4);
    expect(element).to.equal(5);
  });

  it('properly removes min element from heap #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(5.0)
    heap.insert(8.0);
    heap.insert(6.0);
    heap.insert(9.0);

    let min: HeapData   = heap.extractRoot();
    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(6);

    min     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(8);

    min     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(1);
    expect(element).to.equal(9);

    min     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(0);
    expect(element).to.equal(0);
  });

  it('properly extracts and inserts', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(5.0)
    heap.insert(8.0);
    heap.insert(6.0);
    heap.insert(9.0);

    let min: HeapData   = heap.extractRoot();
    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(6);

    heap.insert(1.0);

    expect(heap.size).to.equal(4);
    expect(heap.peek()).to.equal(1);
  });

  it('does nothing on deleting from an empty heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.delete(1.0);

    expect(heap.size).to.equal(0);
  });

  it('properly deletes element from a singleton heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.delete(1.0);

    expect(heap.size).to.equal(0);
  });

  it('arbitrary element delete test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);

    heap.delete(1.0);

    expect(heap.size).to.equal(1);
    expect(heap.peek()).to.equal(2);
  });

  it('arbitrary element delete test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);

    heap.delete(2.0);

    expect(heap.size).to.equal(1);
    expect(heap.peek()).to.equal(1);
  });

  it('arbitrary element delete test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    heap.delete(1.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(2);
  });

  it('arbitrary element delete test #4', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    heap.delete(2.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(1);
  });

  it('arbitrary element delete test #5', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    heap.delete(3.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(1);
  });

  it('arbitrary element delete test #6', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(9.0);
    heap.insert(11.0);
    heap.insert(8.0);
    heap.insert(15.0);
    heap.insert(17.0);
    heap.insert(21.0);

    heap.delete(5.0);

    expect(heap.size).to.equal(8);
    expect(heap.peek()).to.equal(1);

    const arr: Array<HeapData> = heap.toArray();
    expect(arr[1]['value']).to.equal(9);
    expect(arr[2]['value']).to.equal(6);
    expect(arr[3]['value']).to.equal(17);
    expect(arr[4]['value']).to.equal(11);
    expect(arr[5]['value']).to.equal(8);
    expect(arr[6]['value']).to.equal(15);
    expect(arr[7]['value']).to.equal(21);
  });

  it('arbitrary element delete test #7', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(9.0);
    heap.insert(11.0);
    heap.insert(8.0);
    heap.insert(15.0);
    heap.insert(17.0);
    heap.insert(21.0);

    heap.delete(8.0);

    expect(heap.size).to.equal(8);
    expect(heap.peek()).to.equal(1);

    const arr: Array<HeapData> = heap.toArray();
    expect(arr[1]['value']).to.equal(5);
    expect(arr[2]['value']).to.equal(6);
    expect(arr[3]['value']).to.equal(9);
    expect(arr[4]['value']).to.equal(11);
    expect(arr[5]['value']).to.equal(21);
    expect(arr[6]['value']).to.equal(15);
    expect(arr[7]['value']).to.equal(17);
  });

  it('MAX-Heap properly assigns a singleton element', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(1);
    expect(element).to.equal(1.0);
  });

  it('MAX-Heap 2-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(2.0);
  });

  it('MAX-Heap 2-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(2.0);
  });

  it('MAX-Heap 3-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0)
    heap.insert(2.0);
    heap.insert(3.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(3.0);
  });

  it('MAX-Heap 3-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(3.0)
    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(3.0);
  });

  it('MAX-Heap 3-element insert test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(2.0)
    heap.insert(1.0);
    heap.insert(3.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(3.0);
  });

  it('MAX-Heap multi-element insert test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(6);
    expect(element).to.equal(9.0);
  });

  it('MAX-Heap multi-element insert test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);
    heap.insert(7.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(7);
    expect(element).to.equal(9.0);

    let curHeap: Array<HeapData> = heap.toArray();
    expect(curHeap[heap.size-1]['value']).to.equal(7);
  });

  it('MAX-Heap multi-element insert test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(2.0);
    heap.insert(4.0);
    heap.insert(3.0);
    heap.insert(9.0);
    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(10.0);
    heap.insert(14.0);
    heap.insert(6.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(14.0);
  });

  it('MAX-Heap multi-element insert test #4', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);
    heap.insert(4.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(7.0);
    heap.insert(8.0);
    heap.insert(9.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(9.0);
  });

  it('MAX-Heap multi-element insert test #5', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(9.0);
    heap.insert(8.0);
    heap.insert(7.0);
    heap.insert(6.0);
    heap.insert(5.0);
    heap.insert(4.0);
    heap.insert(3.0);
    heap.insert(2.0);
    heap.insert(1.0);

    let element: number = heap.peek();

    expect(heap.size).to.equal(9);
    expect(element).to.equal(9.0);
  });

  it('MAX-Heap properly removes max element from heap #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(3.0);
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();
    expect(element).to.equal(9.0);

    let max: HeapData = heap.extractRoot();
    element           = heap.peek();

    expect(heap.size).to.equal(5);
    expect(element).to.equal(8);
  });

  it('MAX-Heap properly removes max element from heap #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(3.0)
    heap.insert(9.0);
    heap.insert(5.0);
    heap.insert(1.0);
    heap.insert(6.0);
    heap.insert(8.0);

    let element: number = heap.peek();
    expect(element).to.equal(9.0);

    let max: HeapData = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(5);
    expect(element).to.equal(8);

    max     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(4);
    expect(element).to.equal(6);
  });

  it('MAX-Heap properly removes min element from heap #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(5.0)
    heap.insert(8.0);
    heap.insert(6.0);
    heap.insert(9.0);

    let max: HeapData   = heap.extractRoot();
    let element: number = heap.peek();

    expect(heap.size).to.equal(3);
    expect(element).to.equal(8);

    max     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(2);
    expect(element).to.equal(6);

    max     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(1);
    expect(element).to.equal(5);

    max     = heap.extractRoot();
    element = heap.peek();

    expect(heap.size).to.equal(0);
    expect(element).to.equal(0);
  });

  it('MAX-Heap does nothing on deleting from an empty heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.delete(1.0);

    expect(heap.size).to.equal(0);
  });

  it('MAX-Heap properly deletes element from a singleton heap', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.delete(1.0);

    expect(heap.size).to.equal(0);
  });

  it('MAX-Heap arbitrary element delete test #1', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);

    heap.delete(1.0);

    expect(heap.size).to.equal(1);
    expect(heap.peek()).to.equal(2);
  });

  it('MAX-Heap arbitrary element delete test #2', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);

    heap.delete(2.0);

    expect(heap.size).to.equal(1);
    expect(heap.peek()).to.equal(1);
  });

  it('MAX-Heap arbitrary element delete test #3', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    expect(heap.peek()).to.equal(3);

    heap.delete(1.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(3);
  });

  it('MAX-Heap arbitrary element delete test #4', function() {
    let heap: TSMT$Heap = new TSMT$Heap();

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    heap.delete(2.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(1);
  });

  it('MAX-Heap arbitrary element delete test #5', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(2.0);
    heap.insert(3.0);

    heap.delete(3.0);

    expect(heap.size).to.equal(2);
    expect(heap.peek()).to.equal(2);
  });

  it('MAX-Heap arbitrary element delete test #6', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(9.0);
    heap.insert(11.0);
    heap.insert(8.0);
    heap.insert(15.0);
    heap.insert(17.0);
    heap.insert(21.0);

    heap.delete(5.0);

    expect(heap.size).to.equal(8);
    expect(heap.peek()).to.equal(21);

    const arr: Array<HeapData> = heap.toArray();
    expect(arr[1]['value']).to.equal(17);
    expect(arr[2]['value']).to.equal(11);
    expect(arr[3]['value']).to.equal(15);
    expect(arr[4]['value']).to.equal(6);
    expect(arr[5]['value']).to.equal(9);
    expect(arr[6]['value']).to.equal(8);
    expect(arr[7]['value']).to.equal(1);
  });

  it('MAX-Heap arbitrary element delete test #7', function() {
    let heap: TSMT$Heap = new TSMT$Heap();
    heap.type           = HeapType.MAX;

    heap.insert(1.0);
    heap.insert(5.0);
    heap.insert(6.0);
    heap.insert(9.0);
    heap.insert(11.0);
    heap.insert(8.0);
    heap.insert(15.0);
    heap.insert(17.0);
    heap.insert(21.0);

    heap.delete(8.0);

    expect(heap.size).to.equal(8);
    expect(heap.peek()).to.equal(21);

    const arr: Array<HeapData> = heap.toArray();
    expect(arr[1]['value']).to.equal(17);
    expect(arr[2]['value']).to.equal(11);
    expect(arr[3]['value']).to.equal(15);
    expect(arr[4]['value']).to.equal(6);
    expect(arr[5]['value']).to.equal(5);
    expect(arr[6]['value']).to.equal(9);
    expect(arr[7]['value']).to.equal(1);
  });

});
