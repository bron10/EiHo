/***@jsx React.DOM */
var Navbar  = require('../Navbar/Navbar.jsx'); 
var React = app.React;
var RouteHandler  = app.Router.RouteHandler;
module.exports = app.React.createClass({
    render : function(){
      return (<div>
<Navbar />
<RouteHandler />
</div>);
  }

})
