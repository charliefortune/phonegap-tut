var app = {


    initialise: function() {
	var self = this;
	this.detailsURL = /^#players\/(\d{1,})/;
	this.registerEvents();
	this.store = new MemoryStore(function() {
	    self.route();
	});
	$("body").on('click', '.find-contact-btn', this.findContact);
    },
    
    findContact: function(event) {
	event.preventDefault();
	console.log('findContact');
	if (!navigator.contacts) {
	    this.showAlert("Contacts API not supported", "Error");
	    return;
	}
	// find all contacts with 'Bob' in any name field
	var options = new ContactFindOptions();
	options.filter="";
	options.multiple=true;
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, 
	    function onSuccess(contacts) {
		alert('Found ' + contacts.length + ' contacts.');
	    }, 
	    function onError(contactError) {
		alert('onError!');
	    }, 
	    options);

	
	//	var contact = navigator.contacts.create();
	//	contact.name = {
	//	    givenName: 'Ruari', 
	//	    familyName: 'Mactaggart'
	//	    };
	//	var phoneNumbers = [];
	//	phoneNumbers[0] = new ContactField('work', '07970722307', false);
	//	//phoneNumbers[1] = new ContactField('mobile', player.cellPhone, true); // preferred number
	//	contact.phoneNumbers = phoneNumbers;
	//	contact.save();
	return false;
    },
    
    route: function() {
	var hash = window.location.hash;
	var self = this;
	
	if (!hash) {
	    $('body').html(new HomeView(this.store).render().el);
	    return;
	}
	else{
	    var match = hash.match(app.detailsURL);
	    if (match) {
		this.store.findById(Number(match[1]), function(player) {
		    $('body').html(new PlayerView(player).render().el);
		});
	    }
	}
    },
    
    registerEvents: function() {
	//var self = this;
	$(window).on('hashchange', $.proxy(this.route, this));
	// Check of browser supports touch events...
	if (document.documentElement.hasOwnProperty('ontouchstart')) {
	    // ... if yes: register touch event listener to change the "selected" state of the item
	    $('body').on('touchstart', 'a', function(event) {
		$(event.target).addClass('tappable-active');
	    });
	    $('body').on('touchend', 'a', function(event) {
		$(event.target).removeClass('tappable-active');
	    });
	} else {
	    // ... if not: register mouse events instead
	    $('body').on('mousedown', 'a', function(event) {
		$(event.target).addClass('tappable-active');
	    });
	    $('body').on('mouseup', 'a', function(event) {
		$(event.target).removeClass('tappable-active');
	    });
	}
    },

    showAlert: function (message, title) {
	if (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	} else {
	    alert(title ? (title + ": " + message) : message);
	}   
    }

};

app.initialise();