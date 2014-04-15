var app = {

<<<<<<< HEAD
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
=======
    findByName: function() {
	//        console.log('findByName');
	//        this.store.findByName($('.search-key').val(), function(employees) {
	//            var l = employees.length;
	//            var e;
	//            $('.employee-list').empty();
	//            for (var i=0; i<l; i++) {
	//                e = employees[i];
	//                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
	//            }
	//        });
	var self = this;
	this.store.findByName($('.search-key').val(), function(players) {
	    $('.player-list').html(self.playerLiTpl(players));
	});
    },

    renderHomeView: function() {
	$('body').html(this.homeTpl());
	$('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    initialise: function() {
	var self = this;
	this.homeTpl = Handlebars.compile($("#home-tpl").html());
	this.playerLiTpl = Handlebars.compile($("#player-li-tpl").html());
	this.store = new MemoryStore(function() {
	    self.renderHomeView();
	    self.showAlert('Store Initialised', 'Info');
	});
	$('.search-key').on('keyup', $.proxy(this.findByName, this));
    },

    showAlert: function (message, title) {
	if (navigator.notification) {
	    navigator.notification.alert(message, null, title, 'OK');
	} else {
	    alert(title ? (title + ": " + message) : message);
	}
>>>>>>> 3e0721acdf0a2bfeae59b7e9f227a5b99a97735c
    }

};

app.initialise();