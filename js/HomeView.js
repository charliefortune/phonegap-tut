var HomeView = function(store) {
 
    this.initialise = function(store){
	this.el = $('<div/>');
	this.el.on('keyup','.search-key',this.findByName);
    }

    this.findByName = function() {
	var self = this;
	store.findByName($('.search-key').val(), function(players) {
	    $('.player-list').html(HomeView.playerLiTpl(players));
	});
    }

    this.render = function() {
	this.el.html(HomeView.homeTpl());
	return this;
    }

    this.initialise();
 
}

HomeView.bannerTpl = Handlebars.compile($("#header-banner-tpl").html());
HomeView.homeTpl = Handlebars.compile($("#home-tpl").html());
HomeView.playerLiTpl = Handlebars.compile($("#player-li-tpl").html());