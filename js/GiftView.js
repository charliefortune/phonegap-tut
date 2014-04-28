var GiftView = function(gift) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	
    };
    
    this.render = function() {
	this.el.html(GiftView.template(gift));
	console.log(gift);
	return this;
    };
 
    this.initialise();
 
}
 
GiftView.template = Handlebars.compile($("#gift-tpl").html());