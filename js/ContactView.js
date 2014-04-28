var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	$("body").on('click','.send-present',function(){
	    app.showAlert('Sending a msg to ' + contact.displayName,"Jeremy-Deals!");
	});
    };
    
    this.render = function() {
	this.el.html(ContactView.template(contact));
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());