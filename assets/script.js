const apiKey = "bca39c92efc2381243d7834988122221";
var searchbtn = document.querySelector('#searchBtn');
var citySearch = document.querySelector('#citySearch');
var previousCities = [];
const presentDay = moment().format('LL');


// function for current weather condition 
function currentWeather(city) {
  var weatherURL = `https://api.openweathermap.org/data/3.0/onecall?q=${city}&units=metric&appid=${apiKey}`; //template literal to interpolate varibale 
    // 'fetch' data from URL
    fetch(weatherURL) .then(function (response) {
      if (response.ok) { // check is response is okay
        console.log(response);
      response.json().then(function (storedSearch) { // json to retreieve object 
        console.log(storedSearch);

          // $("#weatherContent").css("display", "block");
          // $("#cityContent").empty();
       
       
       let icon = storedSearch.weather[0].icon;
       let iconURL = `https://openweathermap.org/img/w/${icon}.png`;

       let cityCurrent =  
       $(`<h3 id="cityCurrent"> ${storedSearch.name} ${presentDay} <img src="${iconURL}"/></h3>
       <p>Temperature: ${storedSearch.main.temp} °C</p>
       <p>Wind Speed: ${storedSearch.wind.speed} KPH</p>
       <p>Humidity: ${storedSearch.main.humidity}\%</p>
       <p>UV Index: ${storedSearch.wind.speed} UV</p>`);

       $("#weatherContent").append(cityCurrent); // append to HTMl - BCS help 
        });
       } })
  } 




// Submit function for user inout city //

function inputCity(event){
    event.preventDefault(); // prevent page refresh //
    var city = citySearch.value.trim(""); // extract input data 
    
    if(previousCities.includes(city)) {
      return;
    } else { 
    previousCities.push(city); 

    let history = $(`<li">${city}</li>`);
    
    $("#searchHistory").append(history);
}
localStorage.setItem("city", JSON.stringify(previousCities)); // stringify to store in local storage 

currentWeather(city); // excicute currentWeather function 
}


// event listener //
searchbtn.addEventListener('click', inputCity);


