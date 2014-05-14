var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	$(this.el).on("click","#contact-form-submit", function()
	{
	    //User saved form
	    var data = $("#contact-form input");
	    console.log(data);
	    app.store.saveContact(data,function(){
		app.showAlert('Contact added','Your contact has been saved.');
		var contactsView = new ContactsView().render();
		app.slidePage(contactsView);
		return false;
	    });
	    
	});
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template());	
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());