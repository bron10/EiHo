/***@jsx React.DOM */

//var BuiltApi  = require('built_modules/built-api');
var React = app.React;
var Card  = require('../Card/card.jsx');
var SubCard  = require('./sub-card.jsx');
var Modal         = require('../modal/modal.jsx')


module.exports = app.React.createClass({
    getInitialState : function(){
      return {
        showOverlay : false,
        type : "",
        cardTitleEditable: false,
        currentTitle : "",
        subCardDetails :{}
      }
    },
    saveTaskOverlay: function(){
      console.log("save card")
      this.setState({
        showOverlay:false,
        type : ""
      });
    },
    cancelOverlayCallback: function(){
      console.log("cancel card")
      this.setState({
        showOverlay:false,
        type : ""
      });
    }, 
    viewCard : function(type, details, node){
      console.log("type, node, details", details)
      $(node.target).closest(".content").removeClass('animated fadeIn');
      this.setState({
      showOverlay : true,
      type : type,
      subCardDetails : details
    });
    },
    changeCardtitle : function(e){
      var self = this;
      if(!this.state.cardTitleEditable){
        $(React.findDOMNode(self.refs.cardTitle)).width(function(index, value) {
          return value + 100;
        }).fadeTo("slow", 0.7);;
      }
      this.setState({cardTitleEditable : true});
      
      setTimeout(function(){
        $(React.findDOMNode(self.refs.cardTitle)).select();
      }, 300);
    },
    saveCardtitle : function(e){
      if(e.which ===13){
        if(this.state.cardTitleEditable){
          $(e.target).width(function(index, value) {
            return value - 100;
          });
        }
        this.setState({cardTitleEditable : false});
      }
    },
    editCardTitle : function(e){
      var cardStore = this.props.data.inherited;
      var stateObj = {};
      stateObj = this.props.data.cardData;
      stateObj.title = $(e.target).val();
      cardStore.Actions.editCardtitle(stateObj);
    },
    render : function(){
      var self = this;
      var wrap = this.props.wrap;
      //console.log("this.props", this.state);
      this.state.currentTitle = this.props.data.cardData.title;
      var taskList = this.props.data.cardData;
      var overlayUI  = (this.state.showOverlay)? <Modal subCardDetails={this.state.subCardDetails} data ={{
        type : this.state.type
      }} saveTaskOverlay={self.saveTaskOverlay} cancelOverlayCallback={self.cancelOverlayCallback}/> : <div/>
      

      return (
        <div className="col-sm-12 pull-left">
          <div className="panel panel-default">
            <div className="inner-panel-heading clearfix">
                <input disabled={this.state.cardTitleEditable ? false : "disabled" } type="text" className="title-ip panel-title pull-left" onChange={this.editCardTitle} onKeyUp={this.saveCardtitle} onClick={this.changeCardtitle} ref="cardTitle" value={self.state.currentTitle} />
                <div className="tag-block col-sm-5 tag-pos-tl">URGENT</div>    
                <div className="tag-block col-sm-5 tag-pos-tr">NOT URGENT</div>    
            </div>
            <div className="panel-body">
              <div className="col-sm-5 pull-left panel-inner panel-1"  onClick={this.viewCard.bind(this, "inu", {
                  title:"DO",
                  subtitle:"Do it now"
                })}>
                <SubCard tasks={taskList} wrap={wrap} type={"inu"} subCardDetails={{
                  title:"DO",
                  subtitle:"Do it now"
                }}/>
                <div className="tag-block tag-pos-lt rotate-left">IMPORTANT</div>
              </div>
              <div className="col-sm-5 pull-right panel-inner panel-2" onClick={this.viewCard.bind(this, "innu", {
                  title:"DECIDE",
                  subtitle:"Schedule a time to do it"
                })}>
                <SubCard tasks={taskList} wrap={wrap} type={"innu"} subCardDetails={{
                  title:"DECIDE",
                  subtitle:"Schedule a time to do it"
                }}/>
            </div>

              <div className="col-sm-5 pull-left panel-inner panel-3" onClick={this.viewCard.bind(this, "ninu", {
                  title:"DELEGATE",
                  subtitle:"Who can do it for you?"
                })}>
                <SubCard tasks={taskList} wrap={wrap} type={"ninu"} subCardDetails={{
                  title:"DELEGATE",
                  subtitle:"Who can do it for you?"
                }}/>
                <div className="tag-block tag-pos-lb rotate-left">NOT IMPORTANT</div>
              </div>
              <div className="col-sm-5 pull-right panel-inner panel-4" onClick={this.viewCard.bind(this, "ninnu", {
                  title:"DELETE",
                  subtitle:"Eliminate it"
                })}>
                <SubCard tasks={taskList} wrap={wrap} type={"ninnu"} subCardDetails={{
                  title:"DELETE",
                  subtitle:"Eliminate it"
                }}/>
              </div>
            </div>
          </div>
       {overlayUI}
      </div>

);
  }
})
