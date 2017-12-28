type = ['','info','success','warning','danger'];

var firebaseRef = firebase.database().ref();
demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    },

    initChartist: function(){
      var managerName = $.cookie('username');
      var numberEmp = 0;
      var userRefer = firebaseRef.child("Users");
      userRefer.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            if (childData["managerName"] == managerName && childData["userRole"] == "employee") {
              numberEmp = numberEmp + 1;
            }
        });
        $("#employee").after(numberEmp);
      });
      var numberList = [];
      var numberMonth = 0;
      var numberDay = 0;
      var today = new Date();
      var curDay = today.getDate();
      var curMonth = today.getMonth()+1;



      		var userRef = firebaseRef.child("Reports").child(managerName);
      		userRef.once('value', function(snapshot) {
          var curEmp = [0,0,0,0,0,0,0,0,0,0,0,0];
      	  snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var createDate = childData["createDate"];
            var dd = createDate[8].toString() + createDate[9].toString();
            var mm = createDate[5].toString() + createDate[6].toString();
            if (dd == curDay && mm == curMonth) {
                numberMonth++;
                numberDay++;
            } else if (mm == curMonth) {
                numberMonth++;
            }
            if (mm == "01") {
              curEmp[0] = curEmp[0] + 1;
            } else if (mm == "02") {
              curEmp[1] = curEmp[1] + 1;
            } else if (mm == "03") {
              curEmp[2] = curEmp[2] + 1;
            } else if (mm == "04") {
              curEmp[3] = curEmp[3] + 1;
            } else if (mm == "05") {
              curEmp[4] = curEmp[4] + 1;
            } else if (mm == "06") {
              curEmp[5] = curEmp[5] + 1;
            } else if (mm == "07") {
              curEmp[6] = curEmp[6] + 1;
            } else if (mm == "08") {
              curEmp[7] = curEmp[7] + 1;
            } else if (mm == "09") {
              curEmp[8] = curEmp[8] + 1;
            } else if (mm == "10") {
              curEmp[9] = curEmp[9] + 1;
            } else if (mm == "11") {
              curEmp[10] = curEmp[10] + 1;
            } else if (mm == "12") {
              curEmp[11] = curEmp[11] + 1;
            }
      	  });
          numberList.push(curEmp);
          var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: numberList
          };

          var options = {
              seriesBarDistance: 10,
              axisX: {
                  showGrid: true
              },
              height: "245px"
          };

          var responsiveOptions = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];

          Chartist.Line('#chartActivity', data, options, responsiveOptions);

          $("#monthlyReport").after(numberMonth);
          $("#dailyReport").after(numberDay);
      	});



    },

	showNotification: function(from, align){
    	color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-gift",
        	message: "Welcome to <b>Paper Dashboard</b> - a beautiful freebie for every web developer."

        },{
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
	}

}
