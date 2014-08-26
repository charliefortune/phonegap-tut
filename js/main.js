var app = {

    notification_period: 5,

    initialise: function() {
		
	var self = this;
	//this.apiURL = 'http://katokuri.local/api/';
	this.apiURL = 'http://katokuri.com/api/'
	this.detailsURL = /^#(contacts|gifts|account)\/?(.*)?\/+?(.*)?\/?(.*)?/;
	this.registerEvents();
	this.store = new WebSqlStore(function() {
	    self.route();
	});
    },
        
    route: function() {
	var self = this;
	var hash = window.location.hash;
	if (!hash) {
	    if (this.homePage) {
		this.slidePage(this.homePage);
	    } else {
		this.homePage = new HomeView(this.store).render();
		this.slidePage(this.homePage);
	    }
	    return;
	}
	
	var match = hash.match(app.detailsURL);
	
	if (match) {
	    //console.log(match);
	    switch(match[1]){
                
		case 'contacts':
		    
		    if(match[2] == 'add'){
			//Show add contact form.
			this.contactView = new ContactView(null).render();
			this.slidePage(this.contactView);
		    }
		    else if(match[2] == 'view'){
			//Show the view contact view.
			self.store.findContactById(match[3],function(contact){
			    this.contactView = new ContactView(contact).render();
			    self.slidePage(this.contactView);
			});
		    }
		    else if(match[2] == 'edit'){
			//Show the edit contact view.
			self.store.findContactById(match[3],function(contact){
			    this.editContactView = new EditContactView(contact).render();
			    self.slidePage(this.editContactView);
			});
			
		    }
		    else if(!isNaN(match[2])){
			//show a single contact.
			self.store.findContactById(match[2],function(contact){
			    this.contactView = new ContactView(contact).render();
			    self.slidePage(this.contactView);
			});
		    }
		    else{
			//show all contacts list.
			this.contactsView = new ContactsView().render();
			this.slidePage(this.contactsView);
		    }
			
			
			
		    break;
                
		case 'gifts':
		    
		    if(!isNaN(match[2])){
			//Show a single gift
			self.store.findGiftById(match[2],function(gift){
			    //console.log(gift);
			    this.giftView = new GiftView(gift).render();
			    self.slidePage(this.giftView);
			});
		    }
		    else if (match[2] == 'contact'){
			//Show the contact gifts list - filtered by tags and previous selections.
			self.store.findContactById(match[3],function(contact){
			    this.giftsView = new GiftsView(contact).render();
			    self.slidePage(this.giftsView);
			});
		    }
		    else {
			//Show the main gifts list
			this.giftsView = new GiftsView(null).render();
			self.slidePage(this.giftsView);
		    }
		    break;
                    
		default:
		    break;
	    }

	}
    },
    
    
    /**
     * Look up a gift and switch in the view.
     * 
     * @param {int} id
     * @returns {undefined}
     */
    findGiftById: function(id){
	var self = this;
	$.get(this.apiURL + 'gift/' + id, null, function(data){
	    self.slidePage(new GiftView(data).render());
	});
    },
    
    slidePage: function(page) {
 
	var currentPageDest,
	self = this;
 
	// If there is no current page (app just started) -> No transition: Position new page in the view port
	if (!this.currentPage) {
	    $(page.el).attr('class', 'page stage-center');
	    $('body').append(page.el);
	    this.currentPage = page;
	    return;
	}
 
	// Cleaning up: remove old pages that were moved out of the viewport
	$('.stage-right, .stage-left').not('.homePage').remove();
 
	if (page === app.homePage) {
	    // Always apply a Back transition (slide from left) when we go back to the home page
	    $(page.el).attr('class', 'page stage-left');
	    currentPageDest = "stage-right";
	} else {
	    // Forward transition (slide from right)
	    $(page.el).attr('class', 'page stage-right');
	    currentPageDest = "stage-left";
	}
 
	$('body').append(page.el);
 
	// Wait until the new page has been added to the DOM...
	setTimeout(function() {
	    // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
	    $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
	    // Slide in the new page
	    $(page.el).attr('class', 'page stage-center transition');
	    self.currentPage = page;
	});
 
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


//function onDeviceReady() {
//    // specify contact search criteria
//    var options = new ContactFindOptions();
//    options.filter="";          // empty search string returns all contacts
//    options.multiple=true;      // return multiple results
//    filter = ["displayName"];   // return contact.displayName field
//
//    // find contacts
//    navigator.contacts.find(filter, onSuccess, onError, options);
//}
//
//var names = [];
//
//// onSuccess: Get a snapshot of the current contacts
////
//function onSuccess(contacts) {
//    for (var i=0; i<contacts.length; i++) {
//        if (contacts[i].displayName) {  // many contacts don't have displayName
//            names.push(contacts[i].displayName);
//        }
//    }
//    alert('contacts loaded');
//}