function createPdfItem(userName, reportName, date, url) {
  $("#content").append('<div class="col-lg-3 col-sm-6">'
  + '<div class="card">'
  + '<a href="' + url  + '">'
  + '<div class="content">'
  + '<div class="row">'
  + '<div class="col-xs-5">'
  + '<div class="icon-big icon-warning text-center">'
  + '<i class="ti-server"></i></div></div>'
  + '<div class="col-xs-7">'
  + '<div class="numbers">'
  + '<p>'  + reportName + '</p>' + userName
  + '</div></div></div>'
  + '<div class="footer"><hr /><div class="stats">'
  + '<i class="ti-reload"></i>'
  + date + '</div></div></div></a></div></div>');
}

var firebaseRef = firebase.database().ref();

function getPdf() {
		var userRef = firebaseRef.child("Reports").child("admin");
		userRef.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
      var id = childData["id"];
      var username = childData["userName"];
      var reportName = childData["reportName"];
      var createDate = childData["createDate"];
      var pdfRef = firebaseRef.child("Pdfs");
    	pdfRef.child(id).child("url").on('value', function (datasnapshot) {
        var url = datasnapshot.val();
        if (url != null) {
          createPdfItem(username, reportName, createDate, datasnapshot.val());
        }
    	});
	  });
	});
}

$(document).ready(function() { getPdf();});
