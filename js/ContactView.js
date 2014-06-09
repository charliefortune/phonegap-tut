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
	    //var dob = new Date(data[6]);
	    var date = new Date();
	    date.setTime = date.getTime() + 1000 * 30;
	    var id = 'katokuri123';
	    console.log(window);
	    window.plugin.notification.local.add({
		id:         id,  // A unique id of the notifiction
		date:       date,    // This expects a date object
		message:    "It is " + data[0] + "'s birthday today!",  // The message that is displayed
		title:      "Katokuri alert."  // The title of the message
		//repeat:     null,  // Either 'secondly', 'minutely', 'hourly', 'daily', 'weekly', 'monthly' or 'yearly'
		//badge:      1,  // Displays number badge to notification
		//sound:      null,  // A sound to be played
		//json:       null,  // Data to be passed through the notification
		//autoCancel: true, // Setting this flag and the notification is automatically canceled when the user clicks it
		//ongoing:    false // Prevent clearing of notification (Android only)
	    });
	    window.plugin.notification.local.onclick = function (id, state, json) {
		alert('Katokuri will take care of it.');
	    };
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