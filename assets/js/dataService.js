var firebaseRef = firebase.database().ref();

function login() {
	var	username = document.getElementById('username');
	var password = document.getElementById('password');
	var userRef = firebaseRef.child("Users").child(username.value);
	userRef.on('value', function (datasnapshot) {
		var data = datasnapshot.val();
		if (data["userRole"] != "admin" && data["userRole"] != "manager") {
			window.alert("Bạn không có quyền đăng nhập");
		} else if (data["password"] == password.value) {
			$.cookie('username', null);
			$.cookie('username', username.value, { expires: 14 });
			cancel();
		} else {
			window.alert("Sai tên đăng nhập hoặc mật khẩu");
		}
	});

}

function cancel() {
	window.location = "dashboard.html";
}

function createUser() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	var retyped_password = document.getElementById('retyped_password').value;
	var name = document.getElementById('name').value;
	var role = document.getElementById('role').value;
	// Thiếu managerId. Cần lưu thông tin admin để điền vào managerId
	if (username == "" ||
			password == "" ||
			retyped_password == "" ||
			name == "" ||
			role == "") {
				window.alert("mật khẩu không trùng khớp");
	} else if (password = retyped_password) {
		var userRef = firebaseRef.child("Users").child(username).set({
			name: name,
			password: password,
			userRole: role,
			username: username
		});
		window.alert("Tạo user thành công");
		cancel();
	} else {
		window.alert("mật khẩu không trùng khớp");
	}

}
