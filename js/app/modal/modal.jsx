
/***@jsx React.DOM */

//var BuiltApi  = require('built_modules/built-api');
var React = app.React;
var SubCard  = require('../Card/sub-card.jsx');
module.exports = app.React.createClass({
    componentDidMount: function(){
    var overlay = $(this.refs['theOverlay'+this.props.data.type].getDOMNode())
    overlay.modal({
      show:'true',
      backdrop:'static'
    })
  },
    wrap : false,
    render : function(){
      var model = this.props.data;
      var subCardDetails = this.props.subCardDetails;
      return (
      <div className="modal fade" ref={'theOverlay'+model.type} tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <SubCard data={this.wrap} type={this.props.data.type} subCardDetails={subCardDetails}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.cancelOverlayCallback}>Close</button>
            </div>

          </div>
        </div>
      </div>    
    );
  }
})

