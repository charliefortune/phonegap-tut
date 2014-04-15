var app = {

    initialise: function() {
    	var self = this;
    	this.store = new MemoryStore(function() {
    	    $('body').html(new HomeView(self.store).render().el);
    	});
    	$('.search-key').on('keyup', $.proxy(this.findByName, this));
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