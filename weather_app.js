// const API_key = "d1845658f92b31c64bd94f06f7188c9c";
// async function fetchWeatherDetails(){
//    try {
//     let city = "haryana";
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
//     const data = await response.json();
//     console.log("weather data:-> " , data);


//     // let newPara = document.createElement('p');
//     // newPara.textContent=`${data?.main?.temp.toFixed(2)} °C`
//     // document.body.appendChild(newPara);
//     renderWeatherInfoOnUI(data);
//    }
//    catch(err){
//     console.log("Error found" + err);
//    }

// }
// async function getCustomWeatherDetails(){
//    try{
//     let lat = 15.6333;
//     let lon = 18.3333;
//     const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
//     let data = await result.json();
//     console.log(data);
//    }
//    catch(err){
//     console.log('Error found' , err);
//    }
// }
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const usercontainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

const API_key = "d1845658f92b31c64bd94f06f7188c9c";
let currentTab = userTab;
currentTab.classList.add("current-tab");
getfromSessionStorage();

// ek kam aur baki hai
function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        // agar ham pehle yourweather wale tab par the and hamne search wale par click kiya 
        // then ek form visible hoga aur baki sare invisible honge
        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        // agar ham pehle serch wlae tab par hain aur hm your weather wlae tab par
        // ja rhe hain then hme your weather visible karna hoga baki sab invisible
        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}
userTab.addEventListener("click", function () {
    switchTab(userTab);
});
searchTab.addEventListener("click", function () {
    switchTab(searchTab);
});
// check if coordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        // agar cordi nahi mile toh
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch (err) {
        loadingScreen.classList.remove("active");
        //
    }
}
// agar apke pas json object hai aur aap usko fetch karn chahte ho then we use optional chainig operator, agar jo object aap fetch karna chahte hain aur wo present nahi toh undefined ayega error nahi auega

function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-watherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

 //   api ko chrome par pste karo aur result ko json conveter mein convet karo then observ karo 
   cityName.innerText = weatherInfo?.name;
   console.log('country icon link calling');
   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   console.log('country icon link called');
   desc.innerText = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
   temp.innerText = `${weatherInfo?.main?.temp} °C`;
   windSpeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
   humidity.innerText = `${weatherInfo?.main?.humidity}%`;
   cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}
//agar apko ye wala function ko samajhana hai then visit w3 school webvsite
function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);

    }
    else{
        // show an alert for no geolocation suppoer
    }
}
function showPosition(positon){
    const userCoordinates = {
        lat: positon.coords.latitude,
        lon: positon.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grantAccessButton = document.querySelector("[data-gtantAccess]");
grantAccessButton.addEventListener("click", getlocation);

let searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",function(e){
    e.preventDefault();
    let city = searchInput.value;
    if(city === ""){
        return;
    }
    else{
        fetchSearchWeatherInfo(city);
    }
})
async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        console.log('city api is calling');
       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
       console.log('city api is called');
       const data  = await response.json();
       loadingScreen.classList.remove("active");
       userInfoContainer.classList.add("active");
       renderWeatherInfo(data);
    }
   catch(err){
      //hw
   }
}






























