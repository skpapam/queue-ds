/**
 * queue-ds
 * A simple stack library
 * Copyright (c) 2016 Skevos Papamichail
 */

module.exports = Queue;

function Queue(){
	var _data = [];
	var _size = 0;
	var _max_size = 0;
	
	this.enqueue = function(obj){
		if (_size === _max_size && _max_size>0) return null;
		_data[_size++] = obj;
		return this;
	};
	this.dequeue = function(){
		var deq = _data[0];
		if(!_size) return null;
		for(var i=1; i<_size; i++){
			_data[i-1] = _data[i];
		}
		delete _data[--_size];
		return deq;
	};
	this.peek = function(){
		return !_data[0]?null:_data[0];
	};
	this.empty = function(){
		_size = 0;
		_data = [];
		return this;
	}
	this.size = function(){
		return _size;
	};
	this.isEmpty = function(){
		return _size === 0;
	};
	this.isFull = function(){
		return _size === _max_size;
	};
	this.setMaxSize = function(max_size){
		_max_size = max_size;
		if(_size > _max_size){
			_size = _max_size;
			_data = _data.slice(0,_size);
		}
		return this;
	};
	this.getMaxSize = function(){
		return _max_size;
	};
	this.copy = function(other){
		if(!Queue.isQueue(other)) return this;
		_size = other.size();
		_max_size = other.getMaxSize();
		_data = [];
		for(var i = 0; i < _size; i++){
			_data[i] = other.toArray()[i]; 
		}
		return this;
	};
	this.compare = function(other){
		if (!Queue.isQueue(this) || !Queue.isQueue(other)) return false;
		if ((_size !== other.size()) || (_max_size !== other.getMaxSize())) return false;
		return this.toString(true) === other.toString(true);
	};
	this.toString = function(debug){
		var tostr,json;
		var str = "[object Queue] Size : "+_size+", MaxSize : "+(_max_size?_max_size:"Unlimited")+"\n\n";
		if(!debug) return "[object Queue]";
		for(var i=_size-1; i>=0; i--){
			str += "[";
			switch(typeof _data[i]){
				case "function":
					str += "["+_data[i].toString().substr(0,_data[i].toString().indexOf('('))+"]";
					break;
				case "object":
					json = JSON.stringify(_data[i]);
					tostr += _data[i] && typeof _data[i].toString === "function"?_data[i].toString():_data[i];
					str = json === "{}"? str + tostr : str + json
					break;
				default:
					str += _data[i];
					break;
			}
			str += "]" + (i===_size-1?" <-- DEQUEUE\n":(i===0?" <-- ENQUEUE":"\n"));
		}
		return str;
	};
	this.toArray = function(){
		return _data;
	}
}

Queue.isQueue = function(obj){
	if(!obj) return false;
	if(!obj.constructor) return false;
	if(obj.constructor === Queue) return true;
	return false;
};