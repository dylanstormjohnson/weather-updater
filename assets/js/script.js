const apiKeyGeo = "32f3290ba034d4bcd6196fdb06151ab8";
const apiKeyWeather = "03c7516ad8b972a061cba33872462d14";
let searchedLocation = "";
let iconImgUrl = "http://openweathermap.org/img/w/";
// localStorage.clear();
let priorSearches = JSON.parse(localStorage.getItem("searches")) || [];

$(document).ready(function () {
  const loadStorage = () => {
    for (let i = 0; i < priorSearches.length; i++) {
      // console.log("prior search term in loading");
      // console.log(priorSearches[i]);
      let newButton = $("<button>");
      newButton.text(priorSearches[i]);
      newButton.attr(
        "class",
        "col-sm-12 btn btn-info btn-outline-primary priorSearchBtn"
      );
      $("#newButtonsHolder").append(newButton);
    }
  };

  loadStorage();

  $("#searchBtn").click(function (event) {
    searchedLocation = $("#city").val();
    checkLocation(searchedLocation);
  });

  $(".priorSearchBtn").click(function (event) {
    searchedLocation = $(this).text();
    console.log(searchedLocation);
    checkLocation(searchedLocation);
  });

  $("#clearBtn").click(function (event) {
    console.log("Clearing");
    localStorage.setItem("searches", JSON.stringify([]));
    location.reload();
  });
  const checkLocation = (cityToSearch) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityToSearch}&appid=${apiKeyGeo}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.length === 0) {
          alert("you must search for a valid city");
          return;
        }
        let locationLat = data[0].lat;
        addToStorage(data[0].name);
        let locationLon = data[0].lon;
        checkForecast(locationLat, locationLon);
        $("#locationName").text(searchedLocation);
      });
  };

  const checkForecast = (lat, lon) => {
    fetch(
      `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${lat}&lon=${lon}&appid=${apiKeyWeather}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $("#temp").text("Temp: " + data[0].main.temp);
        $("#wind").text("Wind: " + data[0].wind.speed);
        $("#humidity").text("Humidity: " + data[0].main.humidity);

        $("#day1Icon").attr(
          "src",
          iconImgUrl + data[0].weather[0].icon + ".png"
        );
        $("#day1Temp").text("Temp: " + data[0].main.temp);
        $("#day1Wind").text("Wind: " + data[0].wind.speed);
        $("#day1Humidity").text("Humidity: " + data[0].main.humidity);

        $("#day2Icon").attr(
          "src",
          iconImgUrl + data[1].weather[0].icon + ".png"
        );
        $("#day2Temp").text("Temp: " + data[1].main.temp);
        $("#day2Wind").text("Wind: " + data[1].wind.speed);
        $("#day2Humidity").text("Humidity: " + data[1].main.humidity);

        $("#day3Icon").attr(
          "src",
          iconImgUrl + data[2].weather[0].icon + ".png"
        );
        $("#day3Temp").text("Temp: " + data[2].main.temp);
        $("#day3Wind").text("Wind: " + data[2].wind.speed);
        $("#day3Humidity").text("Humidity: " + data[2].main.humidity);

        $("#day4Icon").attr(
          "src",
          iconImgUrl + data[3].weather[0].icon + ".png"
        );
        $("#day4Temp").text("Temp: " + data[3].main.temp);
        $("#day4Wind").text("Wind: " + data[3].wind.speed);
        $("#day4Humidity").text("Humidity: " + data[3].main.humidity);

        $("#day5Icon").attr(
          "src",
          iconImgUrl + data[4].weather[0].icon + ".png"
        );
        $("#day5Temp").text("Temp: " + data[4].main.temp);
        $("#day5Wind").text("Wind: " + data[4].wind.speed);
        $("#day5Humidity").text("Humidity: " + data[4].main.humidity);
      });
  };

  const addToStorage = (whatToSave) => {
    if (!priorSearches.includes(whatToSave)) {
      priorSearches.push(whatToSave);
      priorSearches.sort();
      localStorage.setItem("searches", JSON.stringify(priorSearches));
      makeButtons(whatToSave);
    }
  };

  const makeButtons = (newValue) => {
    let newButton = $("<button>");
    newButton.text(newValue);
    newButton.attr(
      "class",
      "col-sm-12 btn btn-info btn-outline-primary priorSearchBtn"
    );
    $("#newButtonsHolder").append(newButton);

    $(".priorSearchBtn").click(function (event) {
      searchedLocation = $(this).text();
      console.log(searchedLocation);
      checkLocation(searchedLocation);
    });
  };
});
