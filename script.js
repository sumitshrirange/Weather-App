
// Day & Date Section Code 

function showDayDate(){
    let todaysDay = document.querySelector(".dateSection");

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const now = new Date();
    const day = days[now.getDay()];
    const date = now.getDate();
    const month = months[now.getMonth()];

    todaysDay.innerHTML = day + ", " + date + " " + month;

}
showDayDate();


// Main Weather Section Code 

// https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=14a93779d3bf2e324f6e24c7c4de44ea

let cityname = "Nagpur";
let apikey = "14a93779d3bf2e324f6e24c7c4de44ea";
let URL = "https://api.openweathermap.org/data/2.5/weather?q="

function fetchResults(targetLocation) {

    fetch(URL + cityname + `&appid=${apikey}`)
    
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        document.querySelector(".location").innerHTML = data.name;
        document.querySelector(".temp-rate").innerHTML = Math.floor(data.main.temp / 10);
        document.querySelector(".temp-type").innerHTML = data.weather[0].main;
        document.querySelector(".feels-like").innerHTML = Math.floor(data.main.feels_like / 10);
        document.querySelector(".wind-speed").innerHTML = Math.round(data.wind.speed) + " km/h";
        document.querySelector(".hum-percent").innerHTML = data.main.humidity + "%";
        

        function showTime(){
            // Example timestamps
            const sunriseTimestamp = data.sys.sunrise; // UNIX timestamp for sunrise
            const sunsetTimestamp = data.sys.sunset;  // UNIX timestamp for sunset
            
            // Convert UNIX timestamp to milliseconds (required for Date object)
            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const sunsetDate = new Date(sunsetTimestamp * 1000);
            
            // Function to format hours and minutes
            function formatTime(date) {
                // Get hours and minutes
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${hours}:${minutes}`;
            }
            
            // Format sunrise and sunset times
            const sunriseTime = formatTime(sunriseDate);
            const sunsetTime = formatTime(sunsetDate);
            
            // Output the formatted times
            document.querySelector(".s-rise-time").innerHTML = `${sunriseTime}` + " AM";
            document.querySelector(".s-set-time").innerHTML = `${sunsetTime}` + " PM";
        }
        showTime();

        
        function changeImages(){

            let wImg1 = document.querySelector(".weather-img");
            let wImg2 = document.querySelector(".weather-img2");

            if(data.weather[0].main == "Clouds"){
                wImg1.src = "Assets/Clouds.png";
                wImg2.src = "Assets/Clouds.png";
            }
            else if(data.weather[0].main == "Rain"){
                wImg1.src = "Assets/Big rain drops.png";
                wImg2.src = "Assets/Big rain drops.png";
            }
            else if(data.weather[0].main == "Haze"){
                wImg1.src = "Assets/Moon cloud fast wind.png";
                wImg2.src = "Assets/Moon cloud fast wind.png";
            }
            else if(data.weather[0].main == "Snow" || "Wind"){
                wImg1.src = "Assets/Mid snow fast winds.png";
                wImg2.src = "Assets/Mid snow fast winds.png";
            }
            else if(data.weather[0].main == "Sun"){
                wImg1.src = "Assets/s-rise.png";
                wImg2.src = "Assets/s-rise.png";
            }
            else if(data.weather[0].main == "Zaps" || "Zap"){
                wImg1.src = "Assets/Cloud 3 zap.png";
                wImg2.src = "Assets/Cloud 3 zap.png";
            }
            else if(data.weather[0].main == "Mist"){
                wImg1.src = "Assets/Moon cloud mid rain.png";
                wImg2.src = "Assets/Moon cloud mid rain.png";
            }
            else if(data.weather[0].main == "Clear"){
                wImg1.src = "Assets/Moon cloud fast wind.png";
                wImg2.src = "Assets/Moon cloud fast wind.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                wImg1.src = "Assets/Moon cloud fast wind.png";
                wImg2.src = "Assets/Moon cloud fast wind.png";
            }
        }
        changeImages();

    })
    .catch((error) => {
        console.log(error);
    })
}

fetchResults();

let sub = document.getElementById("submit");
sub.addEventListener("click", () => {
    cityname = document.querySelector(".search input").value;
    fetchResults(cityname)
})