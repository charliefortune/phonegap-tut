var HomeView = function() {

    this.initialise = function() {
        this.el = $('<div/>');
        //this.el.on('keyup', '.search-key', this.findContact);
    }

    this.render = function() {
	var self = this;
        this.el.html(HomeView.homeTpl());
	this.el.append(HomeView.eventLiTpl(null));
	app.store.findUpcomingEvents(function(rows) {
	    //console.log(rows);

	    if(rows){
		//If there are any events, list them.
		var len = rows.length, i;
		var contacts = [];
		for (i = 0; i < len; i++) {
		    contacts.push(rows.item(i));
		}

		self.el.append(HomeView.eventLiTpl(contacts))
	    }
	});
        return this;
    }
    
    this.findUpcomingEvents = function(){
	
    }

//    this.findContact = function(event) {
//	event.preventDefault();
//	var self = this;
//	//app.showAlert('findContact', "Notice");
////	console.log('findContact');
//	if (!navigator.contacts) {
//	    app.showAlert("Contacts API not supported", "Error");
//	    return;
//	}
//        //console.log(event);
//	var options = new ContactFindOptions();
//	options.filter = $(".search-key").val();
//	options.multiple = true;
//	var fields = ["displayName", "id", "birthday"];
//	navigator.contacts.find(fields, 
//	    function onSuccess(contacts) {
//                var msg = 'Found ' + contacts.length + ' contacts.';
//		//app.showAlert("Finished search.", "Notice");
//		if(contacts.length > 0){
//		    //console.log(contacts);
//                    $(".contact-list").html(HomeView.contactLiTpl(contacts));
//                }
//                else{
//                    $(".contact-list").html("No contacts found.");
//                }
//                //app.showAlert(contacts[0].displayName);
//                //this.el.html(msg);
//	    }, 
//	    function onError(contactError) {
//		app.showAlert('onError!');
//	    }, 
//	    options);
////
////	
////	//	var contact = navigator.contacts.create();
////	//	contact.name = {
////	//	    givenName: 'Ruari', 
////	//	    familyName: 'Mactaggart'
////	//	    };
////	//	var phoneNumbers = [];
////	//	phoneNumbers[0] = new ContactField('work', '07970722307', false);
////	//	//phoneNumbers[1] = new ContactField('mobile', player.cellPhone, true); // preferred number
////	//	contact.phoneNumbers = phoneNumbers;
////	//	contact.save();
////	return false;
//    }

    this.initialise();

}

HomeView.bannerTpl = Handlebars.compile($("#header-banner-tpl").html());
HomeView.homeTpl = Handlebars.compile($("#home-tpl").html());
HomeView.contactLiTpl = Handlebars.compile($("#contact-li-tpl").html());
HomeView.eventLiTpl = Handlebars.compile($("#event-li-tpl").html());