var when = require('../main.js')
  , assert = require('assert')
  , twitter_handles = ['garbados', 'thetweetofgod']
  , data_about_handles = []
  , function_list = [];

// if everything works, output will look like this:
var CORRECT_OUTPUT = [
	{'garbados': 'is a cool guy'},
	{'thetweetofgod': 'is a cool guy'}
]

var get_handle_data = function(handle) {
	return function(cb) {
		var results = {};
		results[handle] = 'is a cool guy';
		data_about_handles.push(results);
		cb();
	}
}

for(var i = 0; i < twitter_handles.length; i++) {
	function_list.push(get_handle_data(twitter_handles[i]));
}

when(function_list).then(function() {
	var error;
	try{
		assert.deepEqual(data_about_handles, CORRECT_OUTPUT);
	} catch(e) {
		error = e;
	}
	if (error !== undefined) {
		throw error;
	} else {
		console.log("Tests completed successfully.");
	}
});