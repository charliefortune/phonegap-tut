var GiftView = function(gift) {
  
    this.initialise = function() {
	this.el = $('<div/>');
	
    };
    
    this.render = function() {
	this.el.html(GiftView.template(gift));
	return this;
    };
    
 
    this.initialise();
 
}
 
GiftView.template = Handlebars.compile($("#gift-tpl").html());