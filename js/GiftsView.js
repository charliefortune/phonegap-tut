var GiftsView = function() {
 
    this.initialise = function() {
	this.el = $('<div/>');
	var self = this;
    };
    
    this.render = function() {
	var self = this;
	self.el.html(GiftsView.template());
	
	//fetch out all the gifts for main page
	app.store.findGifts(function(rows) {
	    if(rows){
		//If there are any gifts, list them.
		var len = rows.length, i;
		var gifts = [];
		for (i = 0; i < len; i++) {
		    gifts.push(rows.item(i));
		}

		self.el.append(GiftsView.giftLiTpl(gifts))
	    //$('.gift-list').html(GiftsView.giftLiTpl(data));
	    //console.log(gifts);
	    }
	});
	

	return this;
    };
    
    this.initialise();
 
}
 
GiftsView.template = Handlebars.compile($("#gifts-tpl").html());
GiftsView.giftLiTpl = Handlebars.compile($("#gift-li-tpl").html());