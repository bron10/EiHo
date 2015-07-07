
/***@jsx React.DOM */


var React = app.React;

module.exports = app.React.createClass({
    getInitialState : function(){
      return this.props.data
    },
    componentDidMount: function(e){
      //this.setState(this.props.data);
      $(React.findDOMNode(this.refs.taskLine)).find('.card-inner').focus();
    },
    componentWillUnmount: function(e){
      //console.log("umount takline")
      var selectInput = $(React.findDOMNode(this.refs.taskLine)).prev().find('.card-inner');
      selectInput.putCursorAtEnd();
      //selectInput[0].setSelectionRange(strLength, strLength);
    },
    addNewList : function(e){
      var subCardStore = this.props.inherited.subCardStore;
      var parentElem = this.props.inherited.parent;
      var stateObj = this.state;
      stateObj.index = this.props.index;
      if(e.which === 13){
        $(e.target).blur();

        //Below commented code can be used if we dont want insert new task between two inserted task
        /*if(parentElem[this.props.index+1]){
          var selectInput = $(React.findDOMNode(this.refs.taskLine)).next().find('.card-inner');
          selectInput.putCursorAtEnd();
        }else{
          subCardStore.Actions.insertNewLine(stateObj);
        }*/

        subCardStore.Actions.insertNewLine(stateObj);
       }

      if($(e.target).val()==="" && e.which===8){
        if($(e.target).closest(".list-group").children().length !=1){
          subCardStore.Actions.removeTask(stateObj);
        }
      }
  
      return e.preventDefault();    
    },
    modifyTask : function(e){
      var subCardStore = this.props.inherited.subCardStore;
      var stateObj = this.state;
      stateObj.text = $(e.target).val();
      stateObj.index = this.props.index;
      subCardStore.Actions.modifyTask(stateObj);
    },
    tickTask : function(e){
      var subCardStore = this.props.inherited.subCardStore;
      var stateObj = this.state;
      stateObj.selected = $(e.target).context.checked;
      if(stateObj.selected){
        $(React.findDOMNode(this.refs.taskLine)).find(".card-inner").addClass("strike-text");
      }else{
        $(React.findDOMNode(this.refs.taskLine)).find(".card-inner").removeClass("strike-text");
      }
      subCardStore.Actions.modifyTask(stateObj);
    },
    render : function(){
    var style = this.props.style;
    var checkBox = <input type="checkbox" onChange={this.tickTask} ref="taskcheck" disabled={style.wrap ? true : false}/>;
    var inputBox = <input type="text" className={style.wrap ? "form-control card-inner no-width" : "form-control card-inner" } onKeyUp={this.addNewList} onChange={this.modifyTask} value={this.state.text} disabled={style.wrap ? true : false}/>;
    if(this.state.selected){
      checkBox = <input type="checkbox" checked={this.state.selected} onChange={this.tickTask} ref="taskcheck" disabled={style.wrap ? true : false}/>
      inputBox = <input type="text" className={style.wrap ? "form-control strike-text card-inner no-width" : "form-control strike-text card-inner" } onKeyUp={this.addNewList} onChange={this.modifyTask} value={this.state.text} disabled={style.wrap ? true : false}/>;
    }
      return (
          <div className="input-group" ref="taskLine">
            <span className="input-group-addon">
              {
                checkBox
              }
            </span>
              {
                inputBox
              }
          </div>
        );
  }
})


