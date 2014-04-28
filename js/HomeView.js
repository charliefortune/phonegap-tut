var HomeView = function(store) {

    this.initialise = function(store) {
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findContact);
        //$("body").on('click', '.find-contact-btn', this.findContact);
    }

    this.render = function() {
        this.el.html(HomeView.homeTpl());
        return this;
    }

    this.findContact = function(event) {
	event.preventDefault();
	//console.log('findContact');
	if (!navigator.contacts) {
	    this.showAlert("Contacts API not supported", "Error");
	    return;
	}
        //console.log(event);
	var options = new ContactFindOptions();
	options.filter = $(".search-key").val();
	options.multiple = true;
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, 
	    function onSuccess(contacts) {
                var msg = 'Found ' + contacts.length + ' contacts.';
		if(contacts.length > 0){
                    $(".contact-list").html(HomeView.contactLiTpl(contacts));
                }
                else{
                    $(".contact-list").html("No contacts found.");
                }
                //app.showAlert(contacts[0].displayName);
                //this.el.html(msg);
	    }, 
	    function onError(contactError) {
		app.showAlert('onError!');
	    }, 
	    options);
//
//	
//	//	var contact = navigator.contacts.create();
//	//	contact.name = {
//	//	    givenName: 'Ruari', 
//	//	    familyName: 'Mactaggart'
//	//	    };
//	//	var phoneNumbers = [];
//	//	phoneNumbers[0] = new ContactField('work', '07970722307', false);
//	//	//phoneNumbers[1] = new ContactField('mobile', player.cellPhone, true); // preferred number
//	//	contact.phoneNumbers = phoneNumbers;
//	//	contact.save();
//	return false;
    }

    this.initialise();

}

HomeView.bannerTpl = Handlebars.compile($("#header-banner-tpl").html());
HomeView.homeTpl = Handlebars.compile($("#home-tpl").html());
HomeView.contactLiTpl = Handlebars.compile($("#contact-li-tpl").html());