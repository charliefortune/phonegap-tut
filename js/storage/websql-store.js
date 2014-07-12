var WebSqlStore = function(successCallback, errorCallback) {

    this.initialiseDatabase = function(callback, errorCallback) {
	var self = this;
	this.db = window.openDatabase("KatokuriDB", "1.0", "Katokuri DB", 200000);
	//self.createTables();
	self.sync(callback);
	   
    }


    //Database Admin and Sync Functions

    this.createTables = function(tx) {
		
	this.db.transaction(function(tx){
	    var sql;
	    //tx.executeSql('DROP TABLE IF EXISTS contact');
	    sql = "CREATE TABLE IF NOT EXISTS contact ( " +
	    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	    "first_name VARCHAR(50), " +
	    "last_name VARCHAR(50), " +
	    "address_1 VARCHAR(50), " +
	    "address_2 VARCHAR(50), " +
	    "address_3 VARCHAR(50), " +
	    "postcode VARCHAR(12), " + 
	    "dob VARCHAR(10), " +
	    "relationship_id INTEGER, " + 
	    "modified DATETIME) ";
	    tx.executeSql(sql, null,
		function() {
		    console.log('CREATE contact TABLE success.');
		},
		onError);	    
	
	    //tx.executeSql('DROP TABLE IF EXISTS gift');
	    sql = "CREATE TABLE IF NOT EXISTS gift ( " +
	    "id INTEGER PRIMARY KEY, " +
	    "title VARCHAR(50), " +
	    "description VARCHAR(100), " +
	    "price DOUBLE," +
	    "modified DATETIME);";
	    
	    tx.executeSql(sql, null,
		function() {
		    console.log('CREATE gift TABLE success.');
		},
		onError);
	    
	    //	    tx.executeSql('DROP TABLE IF EXISTS tag');      
	    sql = "CREATE TABLE IF NOT EXISTS tag ( " +
	    "id INTEGER PRIMARY KEY, " +
	    "title VARCHAR(50), " + 
	    "modified DATETIME) ";
	    tx.executeSql(sql, null,
		function() {
		    console.log('CREATE tag TABLE success.');
		},
		onError);
	
	    //	    tx.executeSql('DROP TABLE IF EXISTS gift_tag');
	    sql = "CREATE TABLE IF NOT EXISTS gift_tag ( " +
	    "id INTEGER PRIMARY KEY, " +
	    "gift_id INTEGER, " + 
	    "tag_id INTEGER, " + 
	    "modified DATETIME)";
	    tx.executeSql(sql, null,
		function() {
		    console.log('CREATE gift_tag TABLE success.');
		},
		onError);
	
	    //	    tx.executeSql('DROP TABLE IF EXISTS userorder');
	    sql = "CREATE TABLE IF NOT EXISTS userorder ( " +
	    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	    "gift_id INTEGER, " + 
	    "tag_id INTEGER, " + 
	    "modified DATETIME)";
	    tx.executeSql(sql, null,
		function() {
		    console.log('CREATE userorder TABLE success.');
		},
		onError);
	});
		
    }
    
	
    this.sync = function(callback) {
	var self = this;
	var tables = ["gift"];
	for(var i in tables){
	    var table = tables[i];
	    var syncURL = app.apiURL + 'sync/' + table;
	    this.getLastSync(table, function(lastSync){
		self.getChanges(syncURL, lastSync,
		    function (changes) {
			self.applyChanges(changes, callback);
		    });
	    });
	}
	
 
    }
	
    this.getLastSync = function(table, callback) {
	this.db.transaction(
	    function(tx) {
		var sql = "SELECT MAX(modified) as lastSync FROM " + table;
		console.log(sql);
		tx.executeSql(sql, this.txErrorHandler,
		    function(tx, results) {
			var lastSync = results.rows.item(0).lastSync;
			callback(lastSync);
		    });
	    });
    }
	
    this.getChanges = function(syncURL, since, callback) {
	console.log(syncURL);
	$.ajax({
	    url: syncURL,
	    data: {
		since: since
	    },
	    dataType:"json",
	    success:function (changes) {
		callback(changes);
	    },
	    error: function(model, response) {
		alert(response.responseText);
	    }
	});
 
    }
	
    this.applyChanges = function(items, callback) {
	this.db.transaction(
	    function(tx) {
		var l = items.length;
		var sql =
		"INSERT OR REPLACE INTO gift (id, title, description, price, modified) " +
		"VALUES (?, ?, ?, ?, ?)";
		var item;
		for (var i = 0; i < l; i++) {
		    item = items[i];
		    var params = [item.id, item.title, item.description, item.price, item.modified];
		    tx.executeSql(sql, params,onError);
		}
	    },
	    this.txErrorHandler,
	    function(tx) {
		callback();
	    });
    }
    
    
   
    //Contact Data Functions
 
    this.findContacts = function(callback) {
	this.db.transaction(
	    function(tx) {
		var sql = "SELECT id, first_name, last_name, dob FROM contact WHERE id > 0";
		tx.executeSql(sql, [], function(tx, results) {
		    callback(results.rows.length > 0 ? results.rows : null);
		});
	    });
    };

    this.findContactById = function(id, callback) {
	this.db.transaction(
	    function(tx) {

		var sql = "SELECT c.id, c.first_name, c.last_name, c.address_1, c.address_2, c.address_3, c.postcode, c.dob, c.relationship_id FROM contact c WHERE c.id=:id";

		tx.executeSql(sql, [id], function(tx, results) {
		    callback(results.rows.length === 1 ? results.rows.item(0) : null);
		});
	    });
    };
    
    
    //Gift Data Functions
    
    this.findGifts = function(callback) {
	this.db.transaction(
	    function(tx) {
		var sql = "SELECT id, title, description, price FROM gift WHERE id > 0";
		tx.executeSql(sql, [], function(tx, results) {
		    callback(results.rows.length > 0 ? results.rows : null);
		});
	    });
    };
  
    this.findGiftById = function(id, callback) {
	this.db.transaction(
	    function(tx) {
		var sql = "SELECT * FROM gift g WHERE id=?";
		tx.executeSql(sql, [id], function(tx, results) {
		    callback(results.rows.length === 1 ? results.rows.item(0) : null);
		});
	    });
    };
    
    /**
     * Take a contact and find a suitable gift for them.
     */
    this.findGiftForContact = function(contact, callback){
	
    }
    
    this.saveContact = function(data,callback){
	this.db.transaction(
	    function(tx) {
		//console.log(data);
		if(data[0] == 0){
		    //console.log('INSERT');
		    var sql = "INSERT INTO contact (first_name, last_name, address_1, address_2, address_3, postcode, dob, relationship_id) VALUES (?,?,?,?,?,?,?,?)";
		    ;
		    tx.executeSql(sql, [data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8]] , function() {
			callback();
		    });
		}
		else{
		    //console.log('UPDATE');
		    var sql = "UPDATE contact SET first_name = ?, last_name = ?, address_1 = ?, address_2 = ?, address_3 = ?, postcode = ?, dob = ?, relationship_id = ? WHERE id = ?";
		    tx.executeSql(sql, [data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[0]], function() {
			callback();
		    });
		}		
	    },
	    onError
	    );
	
    }

    this.deleteContact = function(id,callback){
	this.db.transaction(
	    function(tx) {
		console.log('DELETE');
		var sql = "DELETE FROM contact WHERE id = ?";
		tx.executeSql(sql, [id], function() {
		    callback();
		});
		
	    },
	    onError
	    );
	
    }

    this.initialiseDatabase(successCallback, errorCallback);
    
    function onReadyTransaction( ){
	console.log( 'Transaction completed' )
    }
 
    function onSuccessExecuteSql(tx, results){
    //console.log( 'Execute SQL completed' )
    }
    
    function onError(tx, err){
	console.log(err.message);
    }
    
}