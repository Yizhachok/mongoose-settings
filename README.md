# Mongoose settings

Store settings in mongodb

## Using

Sample usage example

```js
var mongoose=require('mongoose'),
	settings=require('mongoose-settings');

var connection=mongoose.createConnection();
settings.registerModel(mongoose.Schema,connection);
settings.set('version','0.0.0',function(err){
	if(err) throw err;

	settings.get('version',function(err,version){
		if(err) throw err;

		console.log('Current version is',version);
	});
});
```

## API

- **registerModel(Schema,connection[,name="sys"])** - Register settings model
- **set(key,value[,callback])** - Set value for key. Callback receive `err`
- **get(key,callback)** - Get settings value. Callback receive `err, value`
- **unset(key[,callback])** - Unset key. Callback receive `err`
