
var Actions = module.exports.Actions = app.Reflux.createActions([
      "editCardtitle",
      "addCard"    
    ]);
// Creates a DataStore
module.exports.Store = app.Reflux.createStore({
  listenables : Actions,
  cards :[],
  // Initial setup
  index : [].length,
  onAddCard: function(){

    this.cards.push({
        title : "card title",
        rand : Date.now(),
        tasks: {
          inu :   [],
          innu :  [],
          ninu :  [],
          ninnu : []
        }
      });
    this.trigger(this.cards);
  },
  onEditCardtitle : function(card){
    var index = this.cards.indexOf(card);
    console.log("this.cards in store", index, card)
    if(card.title)
      this.cards[index].title = card.title;

    this.trigger(this.cards);
  }
});