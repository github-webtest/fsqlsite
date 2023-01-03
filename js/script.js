var db = openDatabase('mytasks', '1.0', 'My Tasks', 5*1024*1024);

function init() {
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS works(ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description text)');
	});
}

function displayAll() {
	db.transaction(function (tx) {
		tx.executeSql('SELECT * FROM works', [], function(tx, results) {
			var n = results.rows.length;
			var s = '<table cellpadding="2" cellspacing="2" border="1">';
			for (var i=0; i<n; i++) {
				var work = results.rows.item(i);
				s += '<tr>';
				s += '<td>' + work.id + '</td>';
				s += '<td>' + work.name + '</td>';
				s += '<td>' + work.description + '</td>';
				s += '</tr>';
			}
			s += '</table>';
			document.getElementById("result").innerHTML = s;
		});
	});
}

function add() {
	db.transaction(function (tx) {
		var name = document.getElementById('workName').value;
		var description = document.getElementById('description').value;
		tx.executeSql('insert into works(name, description) values(?, ?)', [name, description], displayAll());
	});
}

displayAll();
