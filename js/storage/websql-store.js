var WebSqlStore = function(successCallback, errorCallback) {

    this.initialiseDatabase = function(successCallback, errorCallback) {
	var self = this;
	this.db = window.openDatabase("MyPaDB", "1.0", "MyPA DB", 200000);
	this.db.transaction(
	    function(tx) {
		self.createTable(tx);
		self.addSampleData(tx);
	    },
	    function(error) {
		console.log('Transaction error: ' + error);
		if (errorCallback) errorCallback();
	    },
	    function() {
		console.log('Transaction success');
		if (successCallback) successCallback();
	    }
	    )
    }

    this.createTable = function(tx) {
	//tx.executeSql('DROP TABLE IF EXISTS contacts');
	var sql = "CREATE TABLE IF NOT EXISTS contacts ( " +
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"firstName VARCHAR(50), " +
	"lastName VARCHAR(50), " +
	"address_1 VARCHAR(50), " +
	"address_2 VARCHAR(50), " +
	"address_3 VARCHAR(50), " +
	"postcode VARCHAR(12), " + 
	"dob VARCHAR(10), " +
	"relationshipId INTEGER) ";
	tx.executeSql(sql, null,
	    function() {
		console.log('Create table success');
	    },
	    function(tx, error) {
		alert('Create table error: ' + error.message);
	    });
	var sql = "CREATE TABLE IF NOT EXISTS gifts ( " +
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"title VARCHAR(50), " +
	"description VARCHAR(50), " +
	"price VARCHAR(50)) ";
    
	var sql = "CREATE TABLE IF NOT EXISTS tags ( " +
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"title VARCHAR(50)) ";
    
	var sql = "CREATE TABLE IF NOT EXISTS gift_tags ( " +
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"gift_id INTEGER, " + 
	"tag_id INTEGER)";
    
	var sql = "CREATE TABLE IF NOT EXISTS orders ( " +
	"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
	"gift_id INTEGER, " + 
	"tag_id INTEGER)";
		
    }

    this.addSampleData = function(tx, contacts) {
	var contacts = [
	{
	    "id": 1, 
	    "firstName": "Ryan", 
	    "lastName": "Howard", 
	    "address_1":"10 Madison Avenue", 
	    "address_2": '', 
	    "address_3":"New York, NY", 
	    "postcode":"212-999-8888", 
	    "dob":"1987-10-12", 
	    "relationshipId":1
	},

	{
	    "id": 2, 
	    "firstName": "Michael", 
	    "lastName": "Scott", 
	    "title":"Regional Manager", 
	    "managerId": 1, 
	    "city":"Scranton, PA", 
	    "cellPhone":"570-865-2536", 
	    "officePhone":"570-123-4567", 
	    "email":"michael@dundermifflin.com"
	},

	{
	    "id": 3, 
	    "firstName": "Dwight", 
	    "lastName": "Schrute", 
	    "title":"Assistant Regional Manager", 
	    "managerId": 2, 
	    "city":"Scranton, PA", 
	    "cellPhone":"570-865-1158", 
	    "officePhone":"570-843-8963", 
	    "email":"dwight@dundermifflin.com"
	}];
	var l = contacts.length;
	var sql = "INSERT OR REPLACE INTO contacts " +
	"(id, firstName, lastName, address_1, address_2, address_3, postcode, dob, relationshipId) " +
	"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
	var c;
	for (var i = 0; i < l; i++) {
	    c = contacts[i];
	    tx.executeSql(sql, [c.id, c.firstName, c.lastName, c.address_1, c.address_2, c.address_3, c.postcode, c.dob, c.relationshipId],
		function() {
		    console.log('INSERT success');
		},
		function(tx, error) {
		    alert('INSERT error: ' + error.message);
		});
	}
    }

    this.findContacts = function(callback) {
	this.db.transaction(
	    function(tx) {

		var sql = "SELECT c.id, c.firstName, c.lastName, c.address_1, c.address_2, c.address_3, c.postcode, c.dob, c.relationshipId, count(c.id) reportCount " +
		"FROM contacts c ";

		tx.executeSql(sql, [id], function(tx, results) {
		    callback(results.rows.length === 1 ? results.rows : null);
		});
	    },
	    function(error) {
		alert("Transaction Error: " + error.message);
	    }
	    );
    };

    this.findContactById = function(id, callback) {
	this.db.transaction(
	    function(tx) {

		var sql = "SELECT c.id, c.firstName, c.lastName, c.address_1, c.address_2, c.address_3, c.postcode, c.dob, c.relationshipId, count(c.id) reportCount " +
		"FROM contacts c " +
		"WHERE c.id=:id";

		tx.executeSql(sql, [id], function(tx, results) {
		    callback(results.rows.length === 1 ? results.rows.item(0) : null);
		});
	    },
	    function(error) {
		alert("Transaction Error: " + error.message);
	    }
	    );
    };

    this.initialiseDatabase(successCallback, errorCallback);

}
