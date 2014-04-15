var PlayerView = function(player) {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
	$("body").on('click','.send-present',function(){
	    app.showAlert('Sending a present to ' + player.firstName,"Jeremy-Deals!");
	})
    };
    
    this.render = function() {
	this.el.html(PlayerView.template(player));
	return this;
    };
 
    this.initialise();
 
}
 
PlayerView.template = Handlebars.compile($("#player-tpl").html());