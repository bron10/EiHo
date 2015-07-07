/***@jsx React.DOM */

//console.log("require('reflux')", require('reflux'));

window.app = {};
app.Reflux        = require('reflux');
var React = app.React         = require('react');
app.Router        = require('react-router');
window.R            = require('ramda');
var Route         = app.Router.Route;  
var Routes        = app.Router.Routes;   
var RouteHandler  = app.Router.RouteHandler;
var DefaultRoute  = app.Router.DefaultRoute;
var Link              = app.Router.Link;
var headerMixin  = require('./core/mixins/header-mixin');
//component
var Base          = require('./app/base/base.jsx');
var Dashboard     = require('./app/dashboard/dashboard.jsx'); 
var routes = (
    <Route name="base" path="" handler={Base}>
          <Route name="dashboard" path="/dashboard" handler={Dashboard} />
        <DefaultRoute handler={Dashboard} />
    </Route>
);

app.Router.run(routes, function(Handler){
  app.React.render(<Handler/>, document.body);
});

bootcards.init( {
  offCanvasBackdrop : true,
  offCanvasHideOnMainClick : true,
  enableTabletPortraitMode : true,
  disableRubberBanding : true,
  disableBreakoutSelector : 'a.no-break-out'
});


$.fn.putCursorAtEnd = function() {

  return this.each(function() {

    $(this).focus()

    // If this function exists...
    if (this.setSelectionRange) {
      // ... then use it (Doesn't work in IE)

      // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
      var len = $(this).val().length * 2;

      this.setSelectionRange(len, len);
    
    } else {
    // ... otherwise replace the contents with itself
    // (Doesn't work in Google Chrome)

      $(this).val($(this).val());
      
    }

    // Scroll to the bottom, in case we're in a tall textarea
    // (Necessary for Firefox and Google Chrome)
    this.scrollTop = 999999;

  });

};

$.fn.getCursorPosition = function () {
            var pos = 0;
            var el = $(this).get(0);
            // IE Support
            if (document.selection) {
                el.focus();
                var Sel = document.selection.createRange();
                var SelLength = document.selection.createRange().text.length;
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - SelLength;
            }
            // Firefox support
            else if (el.selectionStart || el.selectionStart == '0')
                pos = el.selectionStart;
            return pos;
        }
