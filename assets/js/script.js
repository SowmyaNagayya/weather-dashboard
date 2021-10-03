//selectors
var searchButton = $("#searchbutton");
var inputField = $("#searchinput");
var cityNameStorageField =[];
var uviIndex = $("#UVIndex");

// search button click
searchButton.click(function(event) {
  event.preventDefault();
  var city = inputField.val(); 
  getAPI(city);
});

// Populating the current weather
function getAPI(city) {
  var APIKey = "8cabcf2bb69158502474a06c66719777";
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8cabcf2bb69158502474a06c66719777&units=imperial";
  fetch(requestURL)
    .then(function(response) {
       response.json().then(function (data) {
         console.log(data);
         $("#cityname").html(data["name"]+moment(data.dt,"X").format("( MM/DD/YYYY )") +"<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'/>");
         $("#temp").text("Temp: " + data["main"].temp + " F");
         $("#wind").text("Wind: " + data["wind"].speed + " mph");
         $("#humidity").text("humidity: " + data["main"].humidity+ " %");


         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,daily&appid=8cabcf2bb69158502474a06c66719777`)
         .then(function(response) {
           return response.json()
         })
         .then(function(uvdata) {
             console.log(uvdata);
             uviIndex.html(uvdata.current.uvi);
         })
        // Updating the local storage
        updateStorage(data["name"]);

        // Populating the Future forecast for 5 adys
        futureForecast(data["coord"].lat, data["coord"].lon);

      });
    })
  }

//storing searched city name in local storage         
  function updateStorage(city) {
    
    if(!cityNameStorageField.includes(city)){
    cityNameStorageField.push(city);
    localStorage.setItem("cityNameStorage",  JSON.stringify(cityNameStorageField));
    }
    $('#previouslySearchedCitiesContainer').empty();
      var cityName= JSON.parse(localStorage.getItem("cityNameStorage"));
      for(var i=0;i<cityName.length;i++){
      $("#previouslySearchedCitiesContainer").append(`<li>${cityName[i]} </li>`);
  }
}

 // Query the API's onecall endpoint for forecast data from a full week   

function futureForecast(cityLatitude, cityLongitude){

  var oneCallURI = 'https://api.openweathermap.org/data/2.5/onecall?lat='+cityLatitude+'&lon=' +cityLongitude+ '&appid=8cabcf2bb69158502474a06c66719777&units=imperial';

   
  fetch(oneCallURI)
  .then(function(response) {
     response.json().then(function (data) {
      console.log(data.length);
      console.log(data);
      for(var i=0; i<5;i++){
        $("#date"+i).html(moment(data.daily[i].dt,"X").format("( MM/DD/YYYY )") +"<img src='http://openweathermap.org/img/w/"+data.daily[i].weather[0].icon+".png'/>");
        $("#temp"+i).text("Temp: " + data.daily[i].temp.day + " F");
        $("#wind"+i).text("Wind: " + data.daily[i].wind_speed + " mph");
        $("#humidity"+i).text("humidity: " + data.daily[i].humidity+ " %");
      }
    });
  })

}
