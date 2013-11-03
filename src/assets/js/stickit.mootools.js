/*
---
description: 

license: GPL v2

Authors:
- Davor Ilic
- Ivan Ilic

requires:
  - core

provides: [url]
...
*/

var stickit = new Class({
  Implements : Options,
  options : {
    headline : 'h1' 
  },
  Stickit : function() {
    elements = $$( this.options.headline );
    console.log( 'elements.length: ' + elements.length );
    elements.each( function( obj, i ) {
      console.log(obj);
    });
  },
  initialize : function( options ) {
    var that = this;
    this.setOptions( options );
    that.Stickit();
  }
});
