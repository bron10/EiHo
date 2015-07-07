
var Actions = module.exports.Actions = app.Reflux.createActions([
        "insertNewLine",
        "removeTask",
        "modifyTask"
    ]);
// Creates a DataStore
module.exports.Store = app.Reflux.createStore({
    listenables : Actions,
    taskList :{
        inu :   [],
        innu :  [],
        ninu :  [],
        ninnu : []
    },
    // Initial setup
    init: function() {
        //return this.taskList
    },
    onModifyTask : function(task){
        var index = this.taskList[task.type].indexOf(task);
        this.taskList[task.type][index] = task;
        this.trigger(this.taskList);
    },
    onInsertNewLine : function(task){
        if(this.taskList[task.type].length){
            task.index+=1;
        }
        
        this.taskList[task.type].splice(task.index, 0, {
          placeholder : "Enter some text",
          selected    : false,
          text        : "",
          type        : task.type,
          index       : task.index,
          rand        : Date.now()
        });
        this.trigger(this.taskList);
        
    },
    onRemoveTask : function(task){
        this.taskList[task.type].splice(task.index, 1);
        //console.log("this.taskList[task.type]", this.taskList[task.type], task.index);
        for(var i= task.index; i<this.taskList[task.type].length; i++){
          this.taskList[task.type][i].index--;  
        }
        //console.log("this.taskList on splice",  this.taskList[task.type]);
        this.trigger(this.taskList);
    }

});