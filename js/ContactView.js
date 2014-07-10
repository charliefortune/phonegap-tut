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
	    //app.showAlert('Contact added','Your contact has been saved.');
	    var dob = new Date(data[7]);    //contact's date of birth
	    var split = data[7].split("-");
	    var next_notification = new Date(new Date().getFullYear(), split[1], split[2] - app.notification_period);
	    if(next_notification < new Date()){
		next_notification = new Date(new Date().getFullYear() + 1, split[1], split[2] - app.notification_period);	//If it's already passed then set a notification for next year.
	    }
	    console.log("Next notification = " + next_notification);
	    
	    //	    var date = new Date();
	    //	    date.setTime = date.getTime() + 1000 * 30;
	    var id = 'katokuri_contact_' + data[0];
	    //If we are on a device, add a notification for the time of x days prior to their next special occasion...
	    
	    //	    window.plugin.notification.local.add({
	    //		id:         id,  // A unique id of the notifiction
	    //		date:       next_notification,    // This expects a date object
	    //		message:    "It is " + data[0] + "'s birthday on " + dob,  // The message that is displayed
	    //		title:      "Katokuri alert."  // The title of the message
	    //		json:	    {id: data[0]},
	    //		//repeat:     null,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
	    //		//badge:      1,  // Displays number badge to notification
	    //		//sound:      null,  // A sound to be played
	    //		//json:       null,  // Data to be passed through the notification
	    //		//autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
	    //		//ongoing:    false // Prevent clearing of notification (Android only)
	    //	    });
	    //	    window.plugin.notification.local.onclick = self.notificationOnClick
	    var contactsView = new ContactsView().render();
	    app.slidePage(contactsView);
	});
    }
    
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