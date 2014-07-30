// JavaScript Document
//    <img src="http://maps.googleapis.com/maps/api/staticmap?center=-15.800513,-47.91378&zoom=11&size=200x200"/>
var googleLoaded = false;
google.load("visualization", "1", {packages:["corechart"]});
//for the initial forecast
var currentWeatherInfo;
var hourlyWeatherInfo;
var weeklyWeatherInfo;


var lat = 27.72;
var lng = 85.32;
document.getElementById("latitude").value = lat;
document.getElementById("longitude").value = lng;
var currentForecast = document.getElementById("currentForecast");
function displayCoordinates(pnt) 
{
	lat = pnt.lat().toFixed(6);
	lng = pnt.lng().toFixed(6);
	document.getElementById("latitude").value = lat;
	document.getElementById("longitude").value = lng;
}

//converting the unix time system to normal time....
function convertUnixTime(unixTime)
{
	var date = new Date(unixTime*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	// will display time in 10:30:23 format
	var formattedTime = hours + ':' + minutes + ':' + seconds;
	return formattedTime;
}

var cityCountry = document.getElementById("cityCountry");
var weatherIcon = document.getElementById("weatherIcon");
var temperature = document.getElementById("temperature");
var time = document.getElementById("time");
var tbl = document.getElementById("currentForecastTbl");
var td = tbl.getElementsByTagName("td");
function currentWeatherForecast(resp)
{
	//for the icon....
	ic = resp.weather[0].icon;
	cityCountry.innerHTML =  resp.name+ "," +resp.sys.country ;
	weatherIcon.src = "image/weatherforecast/"+ic+".png";
	temperature.innerHTML = (resp.main.temp-273.15).toFixed(2) + "&deg;C";
	time.innerHTML = convertUnixTime(resp.dt)+ "<br/>" +resp.weather[0].description;
	td[1].innerHTML = convertUnixTime(resp.sys.sunrise);
	td[3].innerHTML = convertUnixTime(resp.sys.sunset);
	td[5].innerHTML = resp.main.humidity + "%";
	td[7].innerHTML = resp.main.pressure + " hPa";
	td[9].innerHTML = (resp.main.temp_min-273.15).toFixed(2) + "&deg;C";
	td[11].innerHTML = (resp.main.temp_max-273.15).toFixed(2) + "&deg;C";
	td[13].innerHTML = resp.clouds.all + " %";
	td[15].innerHTML = resp.wind.speed + " mps";
}

function hourlyWeatherForecast()
{
	if(googleLoaded == true)
	{
      drawTempChart();
	}
	else
	{
		alert("Google Analysis is not loaded");
	}	
}

function weeklyWeatherForecast()
{
	if(googleLoaded == true)
	{
      drawWeeklyTempChart();
	}
	else
	{
		alert("Google Analysis is not loaded");
	}	
}

// tab control
var tabMenu = document.getElementsByClassName("tab");
var tabContent = document.getElementsByClassName("forecast-wrapper");

tabMenu[0].style.marginTop = "12px";
tabMenu[0].style.marginRight = "2px";
tabMenu[0].style.marginLeft = "2px";
tabContent[0].style.display = "table";
for(var i = 0; i < tabMenu.length;i++)
{
	tabMenu[i].onclick = function()
	{
		for(var j = 0; j < tabMenu.length;j++)
		{
			tabMenu[j].style.marginTop = "6px";
			tabMenu[j].style.marginRight = "1px";
			tabMenu[j].style.marginLeft = "1px";
			tabMenu[j].setAttribute("index",j);
			
			tabContent[j].style.display = "none";
		}
		this.style.marginRight = "2px";
		this.style.marginLeft = "2px";
		this.style.marginTop = "12px";
		tabContent[parseInt(this.getAttribute("index"))].style.display = "table";
	}
}



//line chart display....
//for the hourly charts....

var options1 = {
	chartArea:{left:30},
				width:800,
				height:280,
				title: '3 Hourly Forecast',
				curveType: 'function',
				pointSize:5
				};

function drawTempChart() 
{
	var tempArray = [];
	tempArray.push(['Time','Temperature(°C)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].main.temp-273.15);
		tempArray.push(subArray);
	}
	
	var data = google.visualization.arrayToDataTable(tempArray);					
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

function drawHumidityChart() 
{
	var humidityArray = [];
	humidityArray.push(['Time','Humidity(%)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].main.humidity);
		humidityArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(humidityArray);
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

function drawCloudChart() 
{
	var cloudArray = [];
	cloudArray.push(['Time','Cloudness(%)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].clouds.all);
		cloudArray.push(subArray);
	}
	
	var data = google.visualization.arrayToDataTable(cloudArray);
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

function drawPressureChart() 
{
	var pressureArray = [];
	pressureArray.push(['Time','Pressure(hPa)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].main.pressure);
		pressureArray.push(subArray);
	}
	
	var data = google.visualization.arrayToDataTable(pressureArray);			
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

function drawWindChart() 
{
	var windArray = [];
	windArray.push(['Time','Wind Speed(mps)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].wind.speed);
		windArray.push(subArray);
	}
	
	var data = google.visualization.arrayToDataTable(windArray);
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

function drawRainChart() 
{
	var rainArray = [];
	rainArray.push(['Time','Rain-Last 3 hrs(mm)']);
	for(var i = 0; i < 6; i++)
	{
		var subArray = [];
		subArray.push(hourlyWeatherInfo.list[i].dt_txt);
		subArray.push(hourlyWeatherInfo.list[i].rain["3h"]);
		rainArray.push(subArray);
	}
	
	var data = google.visualization.arrayToDataTable(rainArray);
	var chart = new google.visualization.LineChart(document.getElementById('hourlyLineChart'));
	chart.draw(data, options1);
}

// for the weekly charts....

var options2 = {
	chartArea:{left:30},
				width:800,
				height:280,
				title: 'Weekly Forecast',
				curveType: 'function',
				pointSize:5
				};

var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function drawWeeklyTempChart() 
{
	var weeklyTempArray = [];
	weeklyTempArray.push(['Day','Min-Temperature(°C)','Max-Tempurature(°C)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push((weeklyWeatherInfo.list[i].temp.min)-273.15);
		subArray.push((weeklyWeatherInfo.list[i].temp.max)-273.15);
		weeklyTempArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyTempArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}

function drawWeeklyHumidityChart() 
{
	var weeklyHumidityArray = [];
	weeklyHumidityArray.push(['Day','Humidity(%)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push(weeklyWeatherInfo.list[i].humidity);
		weeklyHumidityArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyHumidityArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}

function drawWeeklyCloudChart() 
{
	var weeklyCloudArray = [];
	weeklyCloudArray.push(['Day','Cloudness(%)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push(weeklyWeatherInfo.list[i].clouds);
		weeklyCloudArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyCloudArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}

function drawWeeklyPressureChart() 
{
	var weeklyPressureArray = [];
	weeklyPressureArray.push(['Day','Pressure(hPa)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push(weeklyWeatherInfo.list[i].pressure);
		weeklyPressureArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyPressureArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}

function drawWeeklyWindChart() 
{
	var weeklyWindArray = [];
	weeklyWindArray.push(['Day','Wind(mps)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push(weeklyWeatherInfo.list[i].speed);
		weeklyWindArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyWindArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}

function drawWeeklyRainChart() 
{
	var weeklyRainArray = [];
	weeklyRainArray.push(['Day','Rain-Last 3 hrs(mm)']);
	for(var i = 0; i < 7; i++)
	{
		var date = new Date(weeklyWeatherInfo.list[i].dt*1000);
		var subArray = [];
		subArray.push(days[date.getDay()]);
		subArray.push(weeklyWeatherInfo.list[i].rain);
		weeklyRainArray.push(subArray);
	}
	var data = google.visualization.arrayToDataTable(weeklyRainArray);
	var chart = new google.visualization.LineChart(document.getElementById('weeklyLineChart'));
	chart.draw(data, options2);
}


//ont the click event of the attributes
var attributesDiv = document.getElementById("hourlyGraphSelect");
var attributes =attributesDiv.getElementsByTagName("li");

for(var i = 0; i <attributes.length;i++)
{
	attributes[i].onclick = function()
	{
		switch (this.innerHTML)
		{
			case "Temperature":
			{
				drawTempChart();
				break;
			}
			case "Humidity":
			{
				drawHumidityChart();
				break;
			}
			case "Cloud":
			{
				drawCloudChart();
				break;
			}
			case "Pressure":
			{
				drawPressureChart();
				break;
			}
			case "Wind":
			{
				drawWindChart();
				break;
			}
			case "Rain":
			{
				drawRainChart();
				break;
			}
			default:
				alert("error");
		}
	}
}

//ont the click event of the attributes
var weeklyAttributesDiv = document.getElementById("weeklyGraphSelect");
var weeklyAttributes =weeklyAttributesDiv.getElementsByTagName("li");

for(var i = 0; i <weeklyAttributes.length;i++)
{
	weeklyAttributes[i].onclick = function()
	{
		switch (this.innerHTML)
		{
			case "Temperature":
			{
				drawWeeklyTempChart();
				break;
			}
			case "Humidity":
			{
				drawWeeklyHumidityChart();
				break;
			}
			case "Cloud":
			{
				drawWeeklyCloudChart();
				break;
			}
			case "Pressure":
			{
				drawWeeklyPressureChart();
				break;
			}
			case "Wind":
			{
				drawWeeklyWindChart();
				break;
			}
			case "Rain":
			{
				drawWeeklyRainChart();
				break;
			}
			default:
				alert("error");
		}
	}
}

//initialize the google map
function initialize() 
{
	var mapOptions = {
						center: new google.maps.LatLng(27.72, 85.32),
						zoom: 12
					  };
	var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
	  
	  //on map click event.....
	google.maps.event.addListener(map, 'click', function (event) 
			{
			  displayCoordinates(event.latLng);  
			  //for the current forecast  
			  var currentForecastRequest = new XMLHttpRequest;
			  currentForecastRequest.open('get','http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ lng+'&type=accurate');
			  currentForecastRequest.send();
			  currentForecastRequest.onloadend=function()
			  {
				  currentWeatherInfo = (eval('('+currentForecastRequest.responseText+')'));
				  currentWeatherForecast(currentWeatherInfo);  
			  }  
			  
			  //for the hourly forecast  
			  var hourlyForecastRequest = new XMLHttpRequest;
			  hourlyForecastRequest.open('get','http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+lng+'&type=accurate');
			  hourlyForecastRequest.send();
			  hourlyForecastRequest.onloadend=function()
			  {
				  hourlyWeatherInfo = (eval('('+hourlyForecastRequest.responseText+')'));
				  hourlyWeatherForecast();  
			  } 
			  
			  //for the weekly forecast  
			  var weeklyForecastRequest = new XMLHttpRequest;
weeklyForecastRequest.open('get','http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lat+'&lon='+lng+'&cnt=10&mode=json&type=accurate');
			  weeklyForecastRequest.send();
			  weeklyForecastRequest.onloadend=function()
			  {
				  weeklyWeatherInfo = (eval('('+weeklyForecastRequest.responseText+')'));
				  weeklyWeatherForecast();  
			  } 
			           
			});

	
}
google.maps.event.addDomListener(window, 'load', initialize);



// initial weather forecast when the google loads....
google.setOnLoadCallback(function(){	
	//for initial current forecast
	var initialCurrentForecastRequest = new XMLHttpRequest;
	initialCurrentForecastRequest.open('get','http://api.openweathermap.org/data/2.5/weather?lat=27.7000&lon=85.3333');
	initialCurrentForecastRequest.send();
	initialCurrentForecastRequest.onloadend=function()
	{
		currentWeatherInfo = (eval('('+initialCurrentForecastRequest.responseText+')'));
		currentWeatherForecast(currentWeatherInfo);  
	}  
	
	//for the initial hourly forecast  
	var initialHourlyForecastRequest = new XMLHttpRequest;
	initialHourlyForecastRequest.open('get','http://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+lng+'&type=accurate');
	initialHourlyForecastRequest.send();
	initialHourlyForecastRequest.onloadend=function()
	{
		hourlyWeatherInfo = (eval('('+initialHourlyForecastRequest.responseText+')'));
		hourlyWeatherForecast();  
	} 
	
	//for the initial weekly forecast  
	var initialWeeklyForecastRequest = new XMLHttpRequest;
	initialWeeklyForecastRequest.open('get','http://api.openweathermap.org/data/2.5/forecast/daily?lat='+lat+'&lon='+lng+'&cnt=10&mode=json&type=accurate');
	initialWeeklyForecastRequest.send();
	initialWeeklyForecastRequest.onloadend=function()
	{
		weeklyWeatherInfo = (eval('('+initialWeeklyForecastRequest.responseText+')'));
		weeklyWeatherForecast();  
	}

	googleLoaded = true;
	});