
/***@jsx React.DOM */

var TaskLine      = require('./task-line.jsx');
//var DefaultTaskLine      = require('./default-task-line.jsx');
var subCard  = require('./sub-card-store.js');
var subCardStore = subCard.Store;

var React = app.React;

module.exports = app.React.createClass({
    mixins: [app.Reflux.connect(subCardStore)],
    getInitialState : function(){
      if(!subCardStore.taskList[this.props.type].length){
        subCardStore.taskList[this.props.type].push(this.defaultData());
      }
      return subCardStore.taskList;
    },
    defaultData : function(){
      return {
        placeholder : "Enter some text",
        selected    : false,
        text        : "",
        type        : this.props.type,
        index       : 0,
        rand        : Date.now()
      };
    },
    render : function(){
      var taskObject = {};
      var self = this;
      var wrap = this.props.wrap;
      var type = this.props.type;
      var subCardDetails = this.props.subCardDetails;
      return (
        <div className={wrap ? "sub-card": "panel panel-default"}>
          <h3 className="subcard-title">{subCardDetails.title}</h3>
          <p className="subcard-subtitle">{subCardDetails.subtitle}</p>
          <div className="list-group">
            {this.state[this.props.type].map(function(task, index){
              return (<TaskLine data={task} inherited={{
              subCardStore : subCard,
              parent : self.state[self.props.type]
            }} style={{
              wrap : wrap 
            }}  index={index} key={task.rand}/>);
            })}

          </div>
        </div>                
      );
  }
})


// {
//   subCardStore.taskList[this.props.type].map(function(task, index){
//     return (<TaskLine data={task} inherited={{
//     subCardStore : subCard
//   }} style={{
//     wrap : wrap 
//   }}  index={index} rand={Date.now()}/>);
//   })
// }
// {
//   for(var i=0;i<subCardStore.taskList[this.props.type].length;i++){
//     (<TaskLine data={task} inherited={{
//               subCardStore : subCard
//             }} style={{
//               wrap : wrap 
//             }}  index={index} rand={Date.now()}/>)
//   }
// }