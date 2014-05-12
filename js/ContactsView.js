var ContactsView = function() {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	$("body").on('click','.send-present',function(){
	    app.showAlert('Sending a msg to ' + contact.displayName,"Jeremy-Deals!");
	});
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactsView.template());
	//console.log(contact);
	//Render the giftlist.
	//$.get(app.apiURL + '/gift', null, function(data){
	    //console.log(data);
	    var data = null;
	    self.el.append(ContactsView.contactLiTpl(data));
	//});
	
	return this;
    };
 
    this.initialise();
 
}
 
ContactsView.template = Handlebars.compile($("#contacts-tpl").html());
ContactsView.contactLiTpl = Handlebars.compile($("#contact-li-tpl").html());