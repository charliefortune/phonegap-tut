var PlayerView = function(player) {
 
    this.initialise = function() {
	this.el = $('<div/>');
    };
    
    this.render = function() {
	this.el.html(PlayerView.template(player));
	return this;
    };
 
    this.initialise();
 
}
 
PlayerView.template = Handlebars.compile($("#player-tpl").html());