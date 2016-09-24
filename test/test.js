var Queue = require('../');
var assert = require('assert');

describe('Queue.isQueue()', function(){
	it('String should not be a Queue', function(){
		var q = "test string";
		assert.equal(false,Queue.isQueue(q));
	});
	it('Number should not be a Queue', function(){
		var q = 101;
		assert.equal(false,Queue.isQueue(q));
	});
	it('Null should not be a Queue', function(){
		var q = null;
		assert.equal(false,Queue.isQueue(q));
	});
	it('Undefined should not be a Queue', function(){
		assert.equal(false,Queue.isQueue());
	});
	it('JSON Object should not be a Queue', function(){
		var q = {
			a1 : 2,
			a3 : 3
		};
		assert.equal(false,Queue.isQueue(q));
	});
	it('Object should not be a Queue', function(){
		function obj(){
			this.a = 1;
			this.addSome = function(b){
				return this.a + b;
			};
		}
		var q = new obj();
		assert.equal(false,Queue.isQueue(q));
	});
	it('Function should not be a Queue', function(){
		var q = function(a,b){
			return a+b;
		};
		assert.equal(false,Queue.isQueue(q));
	});
	it('Date should not be a Queue', function(){
		var q = new Date();
		assert.equal(false,Queue.isQueue(q));
	});
	it('Queue should be a Queue', function(){
		var q = new Queue();
		assert.equal(true,Queue.isQueue(q));
	});
});


describe('Enqueuing, Dequeuing and measuring size', function(){
	var q = new Queue();
	it('The size after enqueuing [23,2,10,1] should be 4', function(){
		q.enqueue(23).enqueue(2).enqueue(10).enqueue(1);
		assert.equal(4,q.size());
	});
	it('The next element in queue after dequeuing once should be 2', function(){
		q.dequeue()
		assert.equal(2,q.peek());
	});
	it('The size after enqueuing 10 times the string <strX> should be 13', function(){
		q.enqueue('str1').enqueue('str2').enqueue('str3').enqueue('str4').enqueue('str5');
		q.enqueue('str6').enqueue('str7').enqueue('str8').enqueue('str9').enqueue('str10');
		assert.equal(13,q.size());
		console.log(q.toString(true));
	});
	it('The last dequeued element after 4 dequeues should be <str1>', function(){
		q.dequeue();
		q.dequeue();
		q.dequeue();
		assert.equal('str1',q.dequeue());
	});
	it('.isEmpty() should return false', function(){
		assert.equal(false,q.isEmpty());
	});
	it('The size after emptying the Queue should be 0', function(){
		q.empty();
		assert.equal(0,q.size());
	});
	it('.isEmpty() should return true', function(){
		assert.equal(true,q.isEmpty());
	});
	it('Dequeue on empty Queue should return null', function(){
		assert.equal(null,q.dequeue());
	});
	it('Peek on empty Queue should return null', function(){
		assert.equal(null,q.peek());
	});
});

describe('Checking Maximum Queue Size', function(){
	var q = new Queue();
	it('Setting and getting maximum size of 4 in a Queue', function(){
		q.setMaxSize(4);
		assert.equal(4,q.getMaxSize());
	});
	it('Trying to enqueue 4 elements [1,2,3,4] in the Queue should not return null', function(){
		q.enqueue(1).enqueue(2).enqueue(3);
		assert.equal(q,q.enqueue(4));
	});
	it('Now the queue should be full', function(){
		assert.equal(true,q.isFull());
	});
	it('Trying to enqueue [5] in the Queue should return null', function(){
		assert.equal(null,q.enqueue(5));
	});
	it('The size of Queue should be 4', function(){
		assert.equal(4,q.size());
	});
	it('The next element in queue should be <1>', function(){
		assert.equal(1,q.peek());
	});
	it('Setting new Maximum Size at 2 will result in a Queue with size of 2',function(){
		q.setMaxSize(2);
		assert.equal(2,q.size());
	});
	it('The next element in our Queue should be <1>', function(){
		assert.equal(1,q.peek());
	});
});

describe('Handling different type of elements', function(){
	var q = new Queue();
	var date = new Date();
	it('Enqueuing and peeking a number', function(){
		q.enqueue(1);
		assert.equal(1,q.peek());
		q.empty();
	});
	it('Enqueuing and peeking a string', function(){
		q.enqueue("str");
		assert.equal("str",q.peek());
		q.empty();
	});
	it('Enqueuing and peeking undefined', function(){
		q.enqueue(undefined);
		assert.equal(undefined,q.peek());
		q.empty();
	});

	it('Enqueuing and peeking null', function(){
		q.enqueue(null);
		assert.equal(null,q.peek());
		q.empty();
	});

	it('Enqueuing and peeking a Date', function(){
		q.enqueue(date);
		assert.equal(date,q.peek());
		q.empty();
	});

	it('Enqueuing, peeking and using a JSON object', function(){
		var d = {
				a : 3,
				b : "str",
				c : date
		}
		q.enqueue(d);
		assert.equal(d.a,q.peek().a);
		assert.equal(d.b,q.peek().b);
		assert.equal(d.c,q.peek().c);
		q.empty();
	});

	it('Enqueuing, peeking and using an instance of object', function(){
		function o(){
			this.a = 5;
			this.b = 6;
			this.add = function (){
				return this.a + " + " + this.b + " = " + (this.a+this.b);
			}
		}
		var d = new o();
		q.enqueue(d);
		assert.equal(d.add(),q.peek().add());
		q.empty()
	});
	it('Enqueuing, peeking and calling a function', function(){
		function d(){
			return 1;
		}
		q.enqueue(d);
		assert.equal(d(),q.peek()());
		q.empty();
	});
	it('.toString() should return [object Queue]', function(){
		assert.equal('[object Queue]',q.toString());
	});
	
});

describe('Copying and comparing Queues', function(){
	var q1 = new Queue();
	var q2 = new Queue();
	var date = new Date();
	var d1 = {
			a : 3,
			b : "str",
			c : date
	}
	function o(){
		this.a = 5;
		this.b = 6;
		this.add = function (){
			return this.a + " + " + this.b + " = " + (this.a+this.b);
		}
	}
	function d3(){
		return 1;
	}
	var d2 = new o();
	it('Copying Queue 1 to Queue 2 should not fail', function(){
		q1.enqueue(1);
		q1.enqueue("str");
		q1.enqueue(undefined);
		q1.enqueue(null);
		q1.enqueue(date);
		q1.enqueue(d1);
		q1.enqueue(d2);
		q1.enqueue(d3);		
		
		assert.equal(q2,q2.copy(q1));
		assert.equal(q1.size(),q2.size());
		
	});
	it('Compering Queue 1 with Queue 2 should be true', function(){
		
		assert.equal(true,q1.compare(q2));
	});
	it('Compering Queue 2 with Queue 1 should be true', function(){
		assert.equal(true,q2.compare(q1));
	});
	it('Compering Queue 1 with its self sould be true', function(){
		assert.equal(true,q1.compare(q1));
	});
	it('Comparing Queue 1 with Queue 2 after dequeuing from Queue 2 should be false', function(){
		q2.dequeue();
		assert.equal(false,q1.compare(q2));
	});
	it('Comparing Queue 1 with Queue 2 after dequeuing from Queue 1 should be true', function(){
		q1.dequeue();
		assert.equal(true,q1.compare(q2));
	});
});