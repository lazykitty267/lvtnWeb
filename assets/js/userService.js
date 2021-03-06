function createUserItem(name,username, userRole, managerName) {
  $("#content").append('<div class="col-lg-3 col-sm-6">'
  + '<div class="card">'
  + '<div class="content">'
  + '<div class="row">'
  + '<div class="col-xs-5">'
  + '<div class="icon-big icon-warning text-center">'
  + '<i class="ti-server"></i></div></div>'
  + '<div class="col-xs-7">'
  + '<div class="numbers">'
  + '<p>'  + name + '</p>'
  + '</div></div></div>'
  + '<div class="footer"><hr /><div class="stats">'
  + '<i class="ti-timer"></i>'
  + userRole + '</div>'
  + '<div class="stats" style="float: right;">' + '<i class="ti-home"></i>' + managerName + '</div>'
  + '</div></div></div></div>');
}

var firebaseRef = firebase.database().ref();

function getUser() {

		var userRef = firebaseRef.child("Users");		  
		console.log("aaaa");

		userRef.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
      var name = childData["name"];
      var username = childData["username"];
      var pass = childData["password"];
      var userRole = childData["userRole"];
	  var managerName = childData["managerName"];
	  console.log(username);
      var pdfRef = firebaseRef.child("Pdfs");
		createUserItem(name,username, userRole, managerName);
	  });
	});
}

$(document).ready(function() { getUser();});
