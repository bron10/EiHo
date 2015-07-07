/***@jsx React.DOM */

//var BuiltApi  = require('built_modules/built-api');
var React = app.React;
var Card  = require('../Card/card.jsx');

var cardInstance      = require('../Card/card-store.js');
var cardStore = cardInstance.Store;

module.exports = app.React.createClass({
    wrap : true,
    mixins: [app.Reflux.connect(cardStore, "cardstore")],
    getInitialState : function(){
      if(!cardStore.cards.length){
        cardInstance.Actions.addCard();
      }
      return {cardstore: cardStore.cards};
    },
    addCard: function(){
      cardInstance.Actions.addCard();
    },
    render : function(){
      var self = this;
      console.log("this.state.cardstore", this.state.cardstore);
      return (
        <div id="main" role='main'>
          <div className="content animated fadeInDown">
              <div className="container">
                {/*<div className="add-card clearfix">
                                  <button type="button" className="btn btn-default col-sm-2" onClick={this.addCard}>
                                    <i className="fa fa-plus"></i>
                                  </button>            
                                </div>*/}
                <div className="row">
                  {this.state.cardstore.map(function(card){
                    return <Card data={{
                      cardData : card,
                      inherited : cardInstance
                    }} wrap={self.wrap}/>
                  })}
                </div>
              </div>
          </div>
        </div>
);
  }
})
