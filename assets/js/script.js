var searchButton = $("#searchbutton");
var inputField = $("#searchinput");
var cityName=  JSON.parse(localStorage.getItem("name")) ||  [];

function getAPI(city) {
  var APIKey = "8cabcf2bb69158502474a06c66719777";
  var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8cabcf2bb69158502474a06c66719777&units=imperial";
  fetch(requestURL)
    .then(function(response) {
       response.json().then(function (data) {
         $("#cityname").text(data["name"]);
         $("#temp").text("Temp: " + data["main"].temp);
         $("#wind").text("Wind: " + data["wind"].speed);
         $("#humidity").text("humidity: " + data["main"].humidity);
        //displayForeCast(data, city);
      });
    })
  }


searchButton.click(function(event) {
  event.preventDefault();
  var city = inputField.val(); 
  getAPI(city);
})

//storing searched city name in local storage         
     $("#searchform").on("searchbutton", updateStorage);

       function updateStorage(event) {
           event.preventDefault();
           var cityName=$("#searchinput");
           inputField.push(cityName.val());
           localStorage.setItem("name",  JSON.stringify(cityName));
           var cityName= JSON.parse(localStorage.getItem("name"));
           for(var i=0;i<cityName.length;i++){
           $("#citylist").innerHTML+=`<li>${cityName[i]} </li>`;
        }
       }


// Populate Date


// Populate Weather Type

// Populate Temperature

// Populate Wind

// Populate Humidity



// Populate UV Index







