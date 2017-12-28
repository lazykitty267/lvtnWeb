function createPdfItem(id,userName, reportName, date, url, comment ,imageList, hashTag) {
  $("#content").append('<div class="col-lg-3 col-sm-6">'
  + '<div class="card">'
  + '<div class="content">'
  + '<div class="row">'
  + '<div class="col-xs-5">'
  + '<div class="icon-big icon-warning text-center">'
  + '<i class="ti-server"></i></div></div>'
  + '<div class="col-xs-7">'
  + '<div class="numbers">'
  + '<p>' + reportName + '</p>'
  + '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#'+ id +'">Xem</button>'
  + '</div></div></div>'
  + '<div class="footer"><hr /><div class="stats">'
  + '<i class="ti-timer"></i>'
  + date + '</div>'
  + '<div class="stats" style="float: right;">' + '<i class="ti-home"></i>' + userName + '</div>'
  + '</div></div></div></div>');
  createModalItem(id,userName, reportName, date, url, comment, imageList, hashTag);
}

var firebaseRef = firebase.database().ref();

function getPdf() {
    var managerName = $.cookie('username');
		var userRef = firebaseRef.child("Reports").child(managerName);
		userRef.once('value', function(snapshot) {
	  snapshot.forEach(function(childSnapshot) {
	    var childKey = childSnapshot.key;
	    var childData = childSnapshot.val();
      var id = childData["id"];
      var username = childData["userName"];
      var reportName = childData["reportName"];
      var createDate = childData["createDate"];
      var privateField = childData["privateField"];
      var hashTag = childData["hashTag"];
      var pdfRef = firebaseRef.child("Pdfs");
    	pdfRef.child(id).child("url").on('value', function (datasnapshot) {
        var url = datasnapshot.val();
        var imageList = [];
        if (url != null) {
          var attachRef = firebaseRef.child("Attachs").child(id);
          attachRef.once('value', function (attachSnapshot) {
            attachSnapshot.forEach(function(attachChildSnapshot) {
                var attachChildData = attachChildSnapshot.val();
                imageList.push(attachChildData["url"]);
            });
            createPdfItem(id,username, reportName, createDate, url, privateField ,imageList, hashTag);
          });
        }
    	});
	  });
	});
}

$(document).ready(function() { getPdf();});

function createModalItem(id ,userName, reportName, date, url, comment, imageList, hashTag) {
  var attachString = "";
  for (var i = 0; i < imageList.length; i++) {
    attachString = attachString + '<img src="' + imageList[i] + '" class="img-rounded" '
    + 'onclick="window.open(\'' + imageList[i] + '\')" '
    +'  width="50px" height="50px"/>';
  }
  if (hashTag == null) {
    hashTag = "";
  }
  $('body').append('<div class="modal fade" id="' + id + '" role="dialog">'
  + ' <div class="modal-dialog">' + ' <div class="modal-content">' + ' <div class="modal-header">'
  + '<h3 class="modal-title">' + reportName + '</h4> </div>'
  + '<div class="modal-body">' + '<div class="row"><div class="col-md-4">'
  + '<img src="assets/img/background.jpg" class="img-rounded" alt="Report" width="150px" height="150px"/> </div>'
  + '<div class="col-md-8">'
  + '<label>Người tạo:</label> <span>' + userName + '</span> </br>'
  + '<label>Ngày tạo:</label> <span>' + date + '</span> </br>'
  + '<label>Hình ảnh đính kèm:</label></br>'
  + '<div>' + attachString + '</div></br>'
  + '<label>Hash Tag:</label>' + '<span style="color: blue; font-weight: bold;"> ' + hashTag + '</span>' +'</br>'
  + '<label>Comment:</label>'
  + '<textarea class="form-control" rows="5" readonly="true" resize="none">' + comment +'</textarea> </br>'
  + '</div></div></div>' + '<div class="modal-footer">'
  + '<button type="submit" class="btn btn-default" onclick="window.open(\''+ url +'\')">Xem báo cáo</button>'
  + '<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button></div></div> </div> </div>');
}
