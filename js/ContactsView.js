var ContactsView = function() {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactsView.template());
	app.store.findContacts(function(rows) {
	    var len = rows.length, i;
	    var contacts = [];
	    for (i = 0; i < len; i++) {
		contacts.push(rows.item(i));
	    }

	    self.el.append(ContactsView.contactLiTpl(contacts))
	    //$('.contact-list').html(ContactsView.contactLiTpl(data));
	    //console.log(contacts);
	});

	return this;
    };
    
    this.initialise();
 
}
 
ContactsView.template = Handlebars.compile($("#contacts-tpl").html());
ContactsView.contactLiTpl = Handlebars.compile($("#contact-li-tpl").html());