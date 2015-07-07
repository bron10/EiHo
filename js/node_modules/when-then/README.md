# When-Then

Simple helper for executing functions only after others have completed. Inspired by [this StackOverflow thread](http://stackoverflow.com/questions/11278018/how-to-execute-a-javascript-function-only-after-multiple-other-functions-have-co).

# Install

In terminal:

	npm install when-then

# Usage

In your JavaScript:

	var when = require('when-then');

	when([func1, func2, func3]).then(callback);

`when` takes a list of functions, which it executes internally with a callback as its only parameter. This callback takes no arguments, and is used by `when` internally to determine when functions have completed. `then` executes once all of those functions have completed. A more realistic use-case might look like this:

	var when = require('when-then')
	  , twitter_handles = [...]
	  , data_about_handles = []
	  , function_list = [];

	var get_handle_data = function(handle) {
		return function(cb) {
			async_twitter_function(function(results){
				data_about_handles.push(results);
				cb();
			});
		}
	}

	for(var i = 0; i < twitter_handles.length; i++) {
		function_list.push(get_handle_data(twitter_handles[i]));
	}

	when(function_list).then(function() {
		// do something with data_about_handles
	});

In the above example, we generate functions for everything we want to accomplish, push it to a list of functions, and then use `when` to execute them all. We store the data returned by our function list in a variable that is then available to our `then` callback.

# Tests

To run tests, install the library, and then run:

	npm test when-then