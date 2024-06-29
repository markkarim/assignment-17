const searchLocationInput = document.getElementById("searchLocation");
if (navigator.geolocation) {
  console.log(navigator.geolocation);

  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    getWeatherData(`${lat},${long}`);
  });
} else {
  window.alert("Not Allowed");
}

async function getWeatherData(query) {
  let linkApi = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=d8b6796964ba41ff83d74810242806`
  );
  let data = await linkApi.json();
  console.log(data);
  displayTodayWeather(data);
  displaytomm(data);
  displayAfterTomm(data);
}

searchLocationInput.addEventListener("input", function (e) {
  getWeatherData(e.target.value);
});

function displayTodayWeather(data) {
  const todayDate = data.current.last_updated;

  let date = new Date(todayDate);
  const todayDay = date.getDate();
  const todayWeekDay = date.toLocaleString("en-us", { weekday: "long" });
  const todayMonth = date.toLocaleString("en-us", { month: "long" });

  const cityName = data.location.name;
  const todayDegree = data.current.temp_c;
  const todayCondition = data.current.condition.text;

  todayWeekDayMarkup.innerHTML = todayWeekDay;
  dateToday.innerHTML = `${todayDay} ${todayMonth}`;
  cityToday.innerHTML = cityName;
  tempToday.innerHTML = todayDegree;
  todayCond.innerHTML = todayCondition;
  todayImg.setAttribute("src", data.current.condition.icon);
  humidityToday.innerHTML = data.current.humidity + "%";
  todayWind.innerHTML = data.current.wind_kph + "km/h";
  dirToday.innerHTML = data.current.wind_dir;
}

function displaytomm({ forecast }) {
  console.log(forecast.forecastday[1]);
  tomm.innerHTML= new Date (forecast.forecastday[1].date).toLocaleString("en-us", {weekday: "long"});
  tommImg.setAttribute('src', forecast.forecastday[1].day.condition.icon);
  tommMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c + ' C ';
  tommMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c + ' C ';
  tommText.innerHTML = forecast.forecastday[1].day.condition.text;

}


function displayAfterTomm({ forecast }) {
  console.log(forecast.forecastday[2]);
  afterTomm.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString(
    "en-us",
    { weekday: "long" }
  );
  afterTommImg.setAttribute("src", forecast.forecastday[2].day.condition.icon);
  afterTommMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c + " C ";
  afterTommMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c + " C ";
  afterTommText.innerHTML = forecast.forecastday[2].day.condition.text;
}