var searchButton = $("#searchbutton");
var inputField = $("#searchinput");
var cityNameStorageField =[];


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
         $("#cityname").text(data["name"]);
         $("#temp").text("Temp: " + data["main"].temp + " F");
         $("#wind").text("Wind: " + data["wind"].speed + " mph");
         $("#humidity").text("humidity: " + data["main"].humidity+ " %");

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
        $("#temp"+i).text("Temp: " + data.daily[i].temp.day + " F");
        $("#wind"+i).text("Wind: " + data.daily[i].wind_speed + " mph");
        $("#humidity"+i).text("humidity: " + data.daily[i].humidity+ " %");
      }
    });
  })

}
