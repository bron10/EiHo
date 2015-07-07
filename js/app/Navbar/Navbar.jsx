/***@jsx React.DOM */


var React         = app.React;

module.exports = app.React.createClass({
    render : function(){
      return (<header id="header" className="clearfix">
    <div id="logo-group">
        <h3 className="logo-title">EiHo Todo</h3>
        <p className="sublogo">Eisenhower model + Todo List = <i className="fa fa-thumbs-o-up"></i></p>
    </div>
</header>);
  }
})
