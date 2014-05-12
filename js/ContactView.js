var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');	
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template());	
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());
