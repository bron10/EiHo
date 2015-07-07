var BuiltApi  = require('built_modules/built-api');
// Creates a DataStore
module.exports.Store = Reflux.createStore({
    listenables : [Reflux.createActions([
        "onLoad",     // called by button in TodoItem
    ])],
    // Initial setup
    init: function() {
    // Register statusUpdate action
        
    },
    getCurrentUserSession : function(){
      return BuiltApi.SystemUserSession.get();
    }
});