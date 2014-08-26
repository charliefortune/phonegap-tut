var ContactView = function(contact) {
 
    this.initialise = function() {
	this.el = $('<div/>');
    };
    
    this.render = function() {
	var self = this;
	self.el.html(ContactView.template(contact));	
	return this;
    };
 
    this.findGiftForContact = function(id){
	//Choose a suitable gift for a contact and return it.
	app.store.findGiftForContact(id,function(){
	    //
	    });
    };
 
    this.notificationOnClick = function (id, state, json) {
	//var gift = self.chooseGiftForContact(json['id']);
	//var giftView = new GiftView().render(gift);
	//app.slidePage(giftView);
	alert('Katokuri will take care of it.');
    };
 
    this.initialise();
 
}
 
ContactView.template = Handlebars.compile($("#contact-tpl").html());