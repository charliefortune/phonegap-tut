var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	$("body").on('click','.send-present',function(){
	    app.showAlert('Sending a msg to ' + contact.displayName,"Jeremy-Deals!");
	});
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template(contact));
	console.log(contact);
	//Render the giftlist.
	$.get('http://myapi.local/api/gift', null, function(data){
	    console.log(data);
	    var gifts = null;
	    self.el.append(ContactView.giftLiTpl(gifts));
	});
	
	return this;
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());
ContactView.giftLiTpl = Handlebars.compile($("#gift-li-tpl").html());