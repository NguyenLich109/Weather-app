 // API call
 // dùng event onclick() khi click vào nut button thì hàm GetInfo sẽ được thực thi
 function GetInfo(){
  var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";//tạo biến queryUrl để chứa đường dẫn link

  //tạo biến lat để lấy id lat-select từ tài liệu bên html bằng pt getElementById
  var lat=document.getElementById('lat-select');
  //tạo biến apiOption để chứa chuỗi
  //trong đó units=metri là đơn vị đo lường nhiệt độ 
  // nhiệt dộ tính bằng độ C và tốc độ gió tính theo m/s
  //và exclude=minutely,alerts loại bỏ dữ liệu minutely, alerts khỏi phản hồi api
  var apiOptions = "units=metric&exclude=minutely,alerts&";
  //tạo biến apikey để chứa khóa api của bạn
  var apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
  //tạo biến file nối các chuỗi lại với nhau thành một địa chỉ link
  //lang=vi là hỗ trợ ngôn ngữ tiếng việt


  //   navigator.geolocation.getCurrentPosition((success) => {
  //     let {latitude,longitude} = success.coords;
  //     file = queryUrl + `lat=${latitude}&lon=${longitude}` + "&lang=vi&" + apiOptions + apiKey;
  // })
  var file = queryUrl + lat.value + "&lang=vi&" + apiOptions + apiKey;

  fetch(file)//truyền đường địa chỉ link file vào fetch 
    .then((response) => response.json())
    //truy cập đến dữ liệu của đường dẫn file
    .then((data) => {
    // Weather main data
    var timezone = document.getElementById('time-zone');
    var countryE1 = document.getElementById('country');
    timezone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + data.lon + 'E ';


    //thời tiết hôm nay
    //tạo biến description để lấy dữ liệu mô tả của phần tử đầu tiên trong mảng daily[0]
    var description = data.daily[0].weather[0].description;
    //tạo biến temp để lấy dữ liệu nhiệt độ ban ngày của phần tử đầu tiên trong mảng daily[0]
    var temp = Math.round(data.daily[0].temp.day);
    //tạo biến wind_speed để lấy dữ liệu tốc độ của phần tử đầu tiên trong mảng daily[0]
    var wind_speed = data.daily[0].wind_speed;
    //tạo biến humidity để lấy dữ liệu độ ẩm của phần tử đầu tiên trong mảng daily[0]
    var humidity = data.daily[0].humidity;
    //tạo biến name để chứa chuỗi
    var name = "Thời Tiết Hôm Nay";
    //tạo biến iconName để lấy dữ liệu icon của phần tử đầu tiên trong mảng daily[0]
    var iconName=data.daily[0].weather[0].icon;
    //tạo biến tempNight để lấy dữ liệu nhiệt độ ban đêm của phần tử đầu tiên trong mảng daily[0]
    var tempNight=Math.round(data.daily[0].temp.night);
    //Icons
    var iconBaseUrl = "http://openweathermap.org/img/wn/";//tạo biến iconBaseUrl để chứa 1 chuỗi đường dẫn link
    var iconFormat = ".png";//tạo biến iconFomat để chứa đuôi ảnh .png
    var weatherName=iconBaseUrl + iconName + iconFormat;//tạo biến weatherName để nối các chuỗi lại thành một đường dẫn link icon
    //đổi backgroud cho thẻ body của html
    // document.body.style.backgroundImage =
    //     "url('https://source.unsplash.com/1600x900/?" + lat + "')";
    //thời tiết hôm nay
    //lấy id wrapper-description từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến description lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-description").innerHTML = description;

    //lấy id wrapper-temp từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến temp lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-temp").innerHTML =temp + "°C";

    //lấy id wrapper-wind từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến wind_speed lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-wind").innerHTML = wind_speed +" m/s";

    //lấy id wrapper-humidity từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến humidity lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-humidity").innerHTML = humidity + "%";

    //lấy id wrapper-name từ bên html bằng phương thức getElementById
    //in chuỗi từ biến name lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-name").innerHTML = name;

    //lấy id wrapper-icon từ bên html bằng phương thức getElementById
    //in dữ liệu đường dẫn link từ biến weatherName lên màn hình bằng thuộc tính src
    document.getElementById("wrapper-icon").src =weatherName;

    //lấy id temp-day từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến temp lên màn hình bằng thuộc tính innerhtml
    document.getElementById("temp-day").innerHTML="Ban ngày: "+temp+"°C";

    //lấy id temp-night từ bên html bằng phương thức getElementById
    //in dữ liệu từ biến tempNight lên màn hình bằng thuộc tính innerhtml
    document.getElementById("temp-night").innerHTML="Ban đêm: "+tempNight+"°C";
  



   // Xem Thời tiết hàng giờ
   // Nhiệt độ 24 Trong ngày
   for(var i=0;i<24;i++){ //vòng lặp
    var iconHourNow = data.hourly[i].weather[0].icon;//tạo biến iconHouNow để lấy dữ liệu icon từ các phần tử trong mảng hourly[i]
    //lấy id "wrapper-icon-hour"+i từ bên html bằng phương thức getElementById
    //in dữ liệu đường dẫn link icon lên màn hình bằng thuộc tính src
    document.getElementById("wrapper-icon-hour"+i).src = iconBaseUrl + iconHourNow + iconFormat;

    //lấy id "wrapper-hour"+i từ bên html bằng phương thức getElementById
    //data.hourly[i].temp lấy ra nhiệt độ từ cac phần tử trong mảng hourly[i] và in ra màn hình bằng phương thức innerhtml
    document.getElementById("wrapper-hour"+i).innerHTML = Math.round(data.hourly[i].temp) + "°";
    if(i>23){//nếu i>23 thì i=1
      i=0;
    }
    }

    // lấy thời gian 24 giờ
    var timeNow = new Date().getHours();//tạo biến timeNow để lấy ra giờ hiện tại
    var time1 = timeNow + 1;//tạo biến time1 để lấy thời gian time + 1
    var time2 = time1 + 1;//tạo biến time2 để lấy thời gian time1 + 1
    var time3 = time2 + 1;//tạo biến time3 để lấy thời gian time2 + 1
    var time4 = time3 + 1;//tạo biến time4 để lấy thời gian time3 + 1
    var time5 = time4 + 1;//tạo biến time5 để lấy thời gian time4 + 1
    var time6 = time5 + 1;//tạo biến time6 để lấy thời gian time5 + 1
    var time7 = time6 + 1;//tạo biến time7 để lấy thời gian time6 + 1
    var time8 = time7 + 1;//tạo biến time8 để lấy thời gian time7 + 1
    var time9 = time8 + 1;//tạo biến time9 để lấy thời gian time8 + 1
    var time10 = time9 + 1;//tạo biến time10 để lấy thời gian time9 + 1
    var time11 = time10 + 1;//tạo biến time11 để lấy thời gian time10 + 1
    var time12 = time11 + 1;//tạo biến time12 để lấy thời gian time11 + 1
    var time13 = time12 + 1;//tạo biến time13 để lấy thời gian time12 + 1
    var time14 = time13 + 1;//tạo biến time14 để lấy thời gian time13 + 1
    var time15 = time14 + 1;//tạo biến time15 để lấy thời gian time14 + 1
    var time16 = time15 + 1;//tạo biến time16 để lấy thời gian time15 + 1
    var time17 = time16 + 1;//tạo biến time17 để lấy thời gian time16 + 1
    var time18 = time17 + 1;//tạo biến time18 để lấy thời gian time17 + 1
    var time19 = time18 + 1;//tạo biến time19 để lấy thời gian time18 + 1
    var time20 = time19 + 1;//tạo biến time20 để lấy thời gian time19 + 1
    var time21 = time20 + 1;//tạo biến time21 để lấy thời gian time20 + 1
    var time22 = time21 + 1;//tạo biến time22 để lấy thời gian time21 + 1
    var time23 = time22 + 1;//tạo biến time23 để lấy thời gian time22 + 1

    //kiểm tra nếu quá 24 quay về 0
    if(time1>23){//nếu time1>23 thì time1-24
      time1=time1-24;
    }
    if(time2>23){//nếu time2>23 thì time2-24
      time2=time2-24;
    }
    if(time3>23){//nếu time3>23 thì time3-24
      time3=time3-24;
    }
    if(time4>23){//nếu time4>23 thì time4-24
      time4=time4-24;
    }
    if(time5>23){//nếu time5>23 thì time5-24
      time5=time5-24;
    }
    if(time6>23){//nếu time6>23 thì time6-24
      time6=time6-24;
    }
    if(time7>23){//nếu time7>23 thì time7-24
      time7=time7-24;
    }
    if(time8>23){//nếu time8>23 thì time8-24
      time8=time8-24;
    }
    if(time9>23){//nếu time9>23 thì time9-24
      time9=time9-24;
    }
    if(time10>23){//nếu time10>23 thì time10-24
      time10=time10-24;
    }
    if(time11>23){//nếu time11>23 thì time11-24
      time11=time11-24;
    }
    if(time12>23){//nếu time12>23 thì time12-24
      time12=time12-24;
    }
    if(time13>23){//nếu time13>23 thì time13-24
      time13=time13-24;
    }
    if(time14>23){//nếu time14>23 thì time14-24
      time14=time14-24;
    }
    if(time15>23){//nếu time15>23 thì time15-24
      time15=time15-24;
    }
    if(time16>23){//nếu time16>23 thì time16-24
      time16=time16-24;
    }
    if(time17>23){//nếu time17>23 thì time17-24
      time17=time17-24;
    }
    if(time18>23){//nếu time18>23 thì time18-24
      time18=time18-24;
    }
    if(time19>23){//nếu time19>23 thì time19-24
      time19=time19-24;
    }
    if(time20>23){//nếu time20>23 thì time20-24
      time20=time20-24;
    }
    if(time21>23){//nếu time21>23 thì time21-24
      time21=time21-24;
    }
    if(time22>23){//nếu time22>23 thì time22-24
      time22=time22-24;
    }
    if(time23>23){//nếu time23>23 thì time23-24
      time23=time23-24;
    }

    //lấy id wrapper-time1 từ bên html bằng phương thức getElementById, và in time1 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time1").innerHTML ="Giờ:"+ time1;
    //lấy id wrapper-time2 từ bên html bằng phương thức getElementById, và in time2 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time2").innerHTML ="Giờ:"+ time2;
    //lấy id wrapper-time3 từ bên html bằng phương thức getElementById, và in time3 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time3").innerHTML ="Giờ:"+ time3;
     //lấy id wrapper-time4 từ bên html bằng phương thức getElementById, và in time4 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time4").innerHTML ="Giờ:"+ time4;
     //lấy id wrapper-time5 từ bên html bằng phương thức getElementById, và in time5 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time5").innerHTML ="Giờ:"+ time5;
     //lấy id wrapper-time6 từ bên html bằng phương thức getElementById, và in time6 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time6").innerHTML ="Giờ:"+ time6;
     //lấy id wrapper-time7 từ bên html bằng phương thức getElementById, và in time7 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time7").innerHTML ="Giờ:"+ time7;
     //lấy id wrapper-time8 từ bên html bằng phương thức getElementById, và in time8 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time8").innerHTML ="Giờ:"+ time8;
     //lấy id wrapper-time9 từ bên html bằng phương thức getElementById, và in time9 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time9").innerHTML ="Giờ:"+ time9;
     //lấy id wrapper-time10 từ bên html bằng phương thức getElementById, và in time10 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time10").innerHTML ="Giờ:"+ time10;
     //lấy id wrapper-time11 từ bên html bằng phương thức getElementById, và in time11 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time11").innerHTML ="Giờ:"+ time11;
     //lấy id wrapper-time12 từ bên html bằng phương thức getElementById, và in time12 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time12").innerHTML ="Giờ:"+ time12;
     //lấy id wrapper-time13 từ bên html bằng phương thức getElementById, và in time13 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time13").innerHTML ="Giờ:"+ time13;
     //lấy id wrapper-time14 từ bên html bằng phương thức getElementById, và in time14 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time14").innerHTML ="Giờ:"+ time14;
     //lấy id wrapper-time15 từ bên html bằng phương thức getElementById, và in time15 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time15").innerHTML ="Giờ:"+ time15;
     //lấy id wrapper-time16 từ bên html bằng phương thức getElementById, và in time16 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time16").innerHTML ="Giờ:"+ time16;
     //lấy id wrapper-time17 từ bên html bằng phương thức getElementById, và in time17 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time17").innerHTML ="Giờ:"+ time17;
     //lấy id wrapper-time18 từ bên html bằng phương thức getElementById, và in time18 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time18").innerHTML ="Giờ:"+ time18;
     //lấy id wrapper-time19 từ bên html bằng phương thức getElementById, và in time19 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time19").innerHTML ="Giờ:"+ time19;
     //lấy id wrapper-time20 từ bên html bằng phương thức getElementById, và in time20 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time20").innerHTML ="Giờ:"+ time20;
     //lấy id wrapper-time21 từ bên html bằng phương thức getElementById, và in time21 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time21").innerHTML ="Giờ:"+ time21;
     //lấy id wrapper-time22 từ bên html bằng phương thức getElementById, và in time22 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time22").innerHTML ="Giờ:"+ time22;
     //lấy id wrapper-time23 từ bên html bằng phương thức getElementById, và in time23 lên màn hình bằng thuộc tính innerhtml
    document.getElementById("wrapper-time23").innerHTML ="Giờ:"+ time23;
    


    


    //thời tiết 7 ngày
    for(var i=0;i<7;i++){
      //lấy id "weather-seven__icon"+i từ bên html bằng phương thức getElementById
      //data.daily[i].weather[0].icon lấy ra icon từ cac phần tử trong mảng daily[i] và đường dẫn dược băng thuộc tính src
      document.getElementById("weather-seven__icon"+i).src =iconBaseUrl + data.daily[i].weather[0].icon + iconFormat;

      //lấy id "weather-seven-temp-min"+i từ bên html bằng phương thức getElementById
      //data.daily[i].temp.min lấy ra nhiệt độ nhỏ nhất từ cac phần tử trong mảng daily[i] và in ra màn hình bằng thuộc tính innerhtml
      document.getElementById("weather-seven-temp-min"+i).innerHTML =Math.round(data.daily[i].temp.min) + "°";

      //lấy id "weather-seven-temp-max"+i từ bên html bằng phương thức getElementById
      //data.daily[i].temp.max lấy ra nhiệt độ lớn nhất từ cac phần tử trong mảng daily[i] và in ra màn hình bằng thuộc tính innerhtml
      document.getElementById("weather-seven-temp-max"+i).innerHTML = Math.round(data.daily[i].temp.max) + "°";

      //lấy id "weather-seven-temp-speed"+i từ bên html bằng phương thức getElementById
      //data.daily[i].wind_speed lấy ra tốc độc từ cac phần tử trong mảng daily[i] và in ra màn hình băng thuộc tính innerhtml
      document.getElementById("weather-seven-temp-speed"+i).innerHTML ="Tốc độ:" + data.daily[i].wind_speed + "m/s";
      
      //lấy id "weather-seven-temp-humidity"+i từ bên html bằng phương thức getElementById
      //data.daily[i].humidity lấy ra độ ẩm từ cac phần tử trong mảng daily[i] và in ra màn hình băng thuộc tính innerhtml
      document.getElementById("weather-seven-temp-humidity"+i).innerHTML ="Độ ẩm:" + data.daily[i].humidity + "%";
      if(i>6){// nếu i>6 thì i=0
        i=0;
      }
    }

     //cập nhật lịch 7 ngày tới
     var daySeven = new Date().getDay();//tạo biến daySeven để lấy ngày hiện tại
     var daySeven1=daySeven + 1;//tạo biến daySeven1 để lấy ngày daySeven+1
     var daySeven2=daySeven1 + 1;//tạo biến daySeven2 để lấy ngày daySeven1+1
     var daySeven3=daySeven2 + 1;//tạo biến daySeven3 để lấy ngày daySeven2+1
     var daySeven4=daySeven3 + 1;//tạo biến daySeven4 để lấy ngày daySeven3+1
     var daySeven5=daySeven4 + 1;//tạo biến daySeven5 để lấy ngày daySeven4+1
     var daySeven6=daySeven5 + 1;//tạo biến daySeven6 để lấy ngày daySeven5+1

     if(daySeven1>6){//nếu daySeven1 >6 thì daySeven1-7
      daySeven1=daySeven1-7;
     }
     if(daySeven2>6){//nếu daySeven2 >6 thì daySeven2-7
      daySeven2=daySeven2-7;
     }
     if(daySeven3>6){//nếu daySeven3 >6 thì daySeven3-7
      daySeven3=daySeven3-7;
     }
     if(daySeven4>6){//nếu daySeven4 >6 thì daySeven4-7
      daySeven4=daySeven4-7;
     }
     if(daySeven5>6){//nếu daySeven5 >6 thì daySeven5-7
      daySeven5=daySeven5-7;
     }
     if(daySeven6>6){//nếu daySeven6 >6 thì daySeven6-7
      daySeven6=daySeven6-7;
     }

     var daySevens = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];//tạo biến daySevens là mảng chứa các phần tử
     document.getElementById("seven-day0").innerHTML =daySevens[daySeven];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven] với daySeven là chỉ mục trong mảng 
     document.getElementById("seven-day1").innerHTML =daySevens[daySeven1];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven1]với daySeven1 là chỉ mục trong mảng 
     document.getElementById("seven-day2").innerHTML =daySevens[daySeven2];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven2] với daySeven2 là chỉ mục trong mảng 
     document.getElementById("seven-day3").innerHTML =daySevens[daySeven3];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven3] với daySeven3 là chỉ mục trong mảng 
     document.getElementById("seven-day4").innerHTML =daySevens[daySeven4];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven4] với daySeven4 là chỉ mục trong mảng 
     document.getElementById("seven-day5").innerHTML =daySevens[daySeven5];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven5] với daySeven5 là chỉ mục trong mảng 
     document.getElementById("seven-day6").innerHTML =daySevens[daySeven6];//in ra màn hình ngày hiện tại với thuộc tính innerhtml,daySevens[daySeven6] với daySeven6 là chỉ mục trong mảng 

  });
};
// dung event onload để thực thi ngay lập tức load trang
// ban đầu sẽ lấy value của TP.Hồ chí minh
function DefaultScreen(){
     GetInfo();
  }


/* thời gian */
var days = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']//tạo biến days là mảng chứa các phần từ thứ 2 đến chủ nhật
var months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];//tạo biến month là mảng chứa các phần từ tháng 1 đến tháng 12
var timeEl = document.getElementById("time");//tạo biến timeE1 để lấy id time băng phương thức getElementById
var dateEl = document.getElementById("date");//tạo biến dateE1 để lấy id date băng phương thức getElementById

//hàm setInterval sẽ thực thi một đoạn mã tại một thời điểm trong tương lai
//ở đây hàm sẽ được thực thi  một đoạn mã sau 1s
setInterval(() => {

    var time = new Date();// biến time lấy thời gian hiện tại
    var month = time.getMonth();// biến month lấy tháng hiện tại
    var date = time.getDate();//tạo biến lấy ngày hiện tại
    var day = time.getDay();//tạo biến day lấy thứ ngày hiện tại
    var hour = time.getHours();//tạo biến hour lấy ra giờ hiện tại
    var minutes = time.getMinutes();//tạo biến miuntes lấy ra phút hiện tại

    timeEl.innerHTML = hour+":"+minutes//in ra màn hình giờ và phút bằng thuộc tính innerhtml
    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]//in ra màn hình thứ ngày tháng băng thuộc tính innerhtml

}, 1000);

/*sử lý nút hiện tất cả*/
var hourlyDay=document.getElementById("js-hourly");//tao biến hourlyDay lấy id js-hourly bằng phương thức getElementById
//dùng event onlick khi click vào một ví nó sẽ đc thực thi
function myTurnOn(){
   hourlyDay.classList.toggle('open');//khi click vào nút button thì element chứa id js-hourly sẽ thêm class open vào
}
