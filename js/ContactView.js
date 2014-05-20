var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	
	contact = contact != null ? contact : {};
	
	//user clicked save
	$(this.el).on("click","#contact-form-submit", function()
	{
	    var data = [];
	    $("#contact-form input").each(function(){
		data.push($(this).val());
	    })
	    self.saveContact(data);
	    return false;
	});
    };
    
    this.saveContact = function(data) {
	app.store.saveContact(data,function(){
	    app.showAlert('Contact added','Your contact has been saved.');
	    var contactsView = new ContactsView().render();
	    app.slidePage(contactsView);
	});
    }


    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template(contact));	
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());