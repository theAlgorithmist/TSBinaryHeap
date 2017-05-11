# Typescript Math Toolkit Binary Heap

This is the alpha release of the Typescript Math Toolkit binary heap, which is optimized for nodes with numerical values and optional (Object) data.

The purpose of this release is to make an early version of the source code available to Typescript developers for testing and feedback on the current API.

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Typescript: 2.0.0

Version: 1.0


## Installation

Installation involves all the usual suspects

  - npm and gulp installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and running the tests

1. gulp compile

2. gulp test

The test suite is in Mocha/Chai and specs reside in the _test_ folder.


### TSMT$Heap

The TSMT$Heap is designed to organize numerical values with optional data into a classic binary heap structure.  The current implementation supports either min-heap or max-heap and all operations work on either type of heap.

Min-heap is the default and a _type_ mutator is provided to change the heap type.  In the current alpha release, the _type_ **must** be assigned before any data is placed into the heap; changing _type_ after inserting or deleting data will cause unpredictable effects.

Node data is optional.  An empty _Object_ is associated with each node if data is not provided at insertion.

The list of public methods for the _TSMT$Heap_ class is as follows:

```
get size(): number
get levels(): number
set type(data: number)
fromArray(data: Array<HeapData>): void
toArray(): Array<HeapData>
insert(x: number, data?: Object): void
peek(): number
extractRoot(): HeapData
delete(value: number): void
clear(): void

```

Note that deletion is expected to be a very infrequent operation, so it is not as highly optimized as it could be.  An O(n) search is followed by heapify of the internal structure from the index of the located node.


### Usage

The following example creates a max-heap, inserts data, and then deletes and element corresponding to a supplied numerical value


```
  const heap: TSMT$Heap = new TSMT$Heap();
  heap.type             = HeapType.MAX;

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
```


Refer to the specs in the test folder for more usage examples.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>

