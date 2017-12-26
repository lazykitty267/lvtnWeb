function createPdfItem(id,userName, reportName, date, url) {
  $("#content").append('<div class="col-lg-3 col-sm-6">'
  + '<div class="card">'
  + '<div class="content">'
  + '<div class="row">'
  + '<div class="col-xs-5">'
  + '<div class="icon-big icon-warning text-center">'
  + '<i class="ti-server"></i></div></div>'
  + '<div class="col-xs-7">'
  + '<div class="numbers">'
  + '<p>'  + reportName + '</p>'
  + '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#'+ id +'">Xem</button>'
  + '</div></div></div>'
  + '<div class="footer"><hr /><div class="stats">'
  + '<i class="ti-timer"></i>'
  + date + '</div>'
  + '<div class="stats" style="float: right;">' + '<i class="ti-home"></i>' + userName + '</div>'
  + '</div></div></div></div>');
  createModalItem(id,userName, reportName, date, url, "test");
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
          createPdfItem(id,username, reportName, createDate, datasnapshot.val());
        }
    	});
	  });
	});
}

$(document).ready(function() { getPdf();});

function createModalItem(id ,userName, reportName, date, url, comment) {
  $('body').append('<div class="modal fade" id="' + id + '" role="dialog">'
  + ' <div class="modal-dialog">' + ' <div class="modal-content">' + ' <div class="modal-header">'
  + '<h3 class="modal-title">' + reportName + '</h4> </div>'
  + '<div class="modal-body">' + '<div class="row"><div class="col-md-4">'
  + '<img src="assets/img/background.jpg" class="img-rounded" alt="Report" width="150px" height="150px"/> </div>'
  + '<div class="col-md-8">'
  + '<label>Người tạo:</label> <span>' + userName + '</span> </br>'
  + '<label>Ngày tạo:</label> <span>' + date + '</span> </br>'
  + '<label>Hình ảnh đính kèm:</label></br>'
  + '<label>Hash Tag:</label></br>'
  + '<label>Comment:</label>'
  + '<textarea class="form-control" rows="5" readonly="true" resize="none">' + comment +'</textarea> </br>'
  + '</div></div></div>' + '<div class="modal-footer">'
  + '<button type="submit" class="btn btn-default" onclick="window.open(\''+ url +'\')">Xem báo cáo</button>'
  + '<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button></div></div> </div> </div>');
}

function download(url) {
  window.open(url);
}
