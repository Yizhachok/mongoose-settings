'use strict';

var model;

function defCallback(err){
	if(err) throw err;
}

/**
 * Register settings model
 * @param Schema
 * @param connection
 * @param [name="sys"]
 */
exports.registerModel=function(Schema,connection,name){
	name=name||'sys';

	var Settings=new Schema({
		name:{
			type:String,
			trim:true,
			required:true,
			unique:true,
			index:true
		},
		data:{type:Schema.Types.Mixed}
	});

	exports.model=model=connection.model(name,Settings,name);
};
/**
 * Set settings
 * @param {String} key
 * @param {*} value
 * @param {Function} [callback]
 */
exports.set=function(key,value,callback){
	callback=callback||defCallback;
	model.findOne({name:key},function(err,doc){
		if(err) callback(err);
		else{
			if(!doc) doc=new model({name:key});
			doc.data=value;
			doc.save(callback);
		}
	});
};
/**
 * Get settings data
 * @param {String} key
 * @param {Function} callback
 */
exports.get=function(key,callback){
	model.findOne({name:key},'-_id data',{lean:true},function(err,doc){
		if(err) callback(err);
		else{
			if(doc) doc=doc.data;
			callback(null,doc);
		}
	});
};
/**
 * Unset setting value
 * @param {Stream} key
 * @param {Function} [callback]
 */
exports.unset=function(key,callback){
	model.remove({name:key},callback||defCallback);
};