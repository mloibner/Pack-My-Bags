const urlinfo = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $('select');
let dailyForcast = [];

const urlAPI = "https://api.openweathermap.org/data/2.5/onecall?"

let result = {};

let qtdItem = {};

let country = {
    "windy": ['Parker-Jacket', 'Jeans', 'Socks', 'Skivy', 'Scalf'],
    "rainy": ['Sweater', 'Gumboots', 'Jeans', 'Skivy', 'Flanno'],
    "sunny": ['Shorts', 'T-Shirt', 'Hat', 'Singlet', 'Sneakers']
}
let city = {
    "windy": ['Coat', 'Slacks', 'Socks', 'Button-Up/Blouse', 'Cardigan'],
    "rainy": ['Jumper', 'Boots', 'Slacks', 'Skivy', 'Shirt'],
    "sunny": ['Shorts/Skirt', 'T-Shirt', 'Hat', 'Suncream', 'Sandals']
}
let beach = {
    "windy": ['Parker-Jacket', 'Tracksuit', 'Socks', 'Swim-Suit/Boardies', 'Scalf'],
    "rainy": ['Swim-Suit/Boardies', 'Thongs', 'Hoodie', 'Shorts', 'Umbrella'],
    "sunny": ['Thongs', 'Singlet', 'Hat', 'Suncream', 'Swim-Suit/Boardies']
}
let other = ['Suncream', 'Umbrella']

$("#travelInformation").on("submit", function() {
    event.preventDefault();

    let valLocation = travelLocation.val();
    let valStartDates = startDates.val();
    let valEndDates = endDates.val();
    let valType = typeTravel.val();

    const searchURL = urlinfo + "q=" + valLocation + "&appid=" + apiKey;


    valStartDates = moment(valStartDates).unix();
    valEndDates = moment(valEndDates).unix();


    let maxEndDate = moment().add(9, "days").unix();


    if (maxEndDate > valEndDates) {
        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(response) {
            result = response;
            console.log(result);

            const lon = result.city.coord.lon;
            const lat = result.city.coord.lat;

            const searchCity = urlAPI + "lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutelyy&units=metric&appid=" + apiKey;

            $.ajax({
                url: searchCity,
                method: "GET"
            }).then(function(responseCity) {
                //clear list of items
                $("#itemsList").empty();

                //array for the dates of the trip
                let tripDates = [];

                // temperature of the days.
                let tempDates = [];

                // for to get the daily weather and temperature for the days that the user select.
                dailyForcast = responseCity.daily;
                for (let i = 0; i < dailyForcast.length; i++) {
                    let dates = dailyForcast[i].dt;
                    let temp = dailyForcast[i].temp.day;

                    if (dates > valStartDates && dates < valEndDates) {
                        tripDates.push(dailyForcast[i]);
                        tempDates.push(temp);
                    }
                }

                //empty variable that will recieve sum of the temperature of the days
                let sumTemp = 0;

                //for to add the temperature.
                for (let i = 0; i < tempDates.length; i++) {
                    sumTemp += parseInt(tempDates[i], 10); //don't forget to add the base
                }

                //get the avg of the temp
                let avgTemp = sumTemp / tempDates.length;

                // leave the avg temp with 2 decimals.
                avgTemp = avgTemp.toFixed(2);

                //show on the html the avg temp.
                let weatherWrapper = $("<h4>");

                weatherWrapper.append("The avg temperature for your trip will be: " + avgTemp + "&#8451;");

                $("#itemsList").append(weatherWrapper);


                //arrays with the weather conditions.
                const condWindy = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado", "Clouds"];
                const condSunny = ["Clear"];
                const condRainy = ["Snow", "Rain", "Drizzle", "Thunderstorm"];


                // for to show the info of the days of trip
                for (let i = 0; i < tripDates.length; i++) {
                    let dayDate = tripDates[i].dt;
                    let dayTemp = tripDates[i].temp.day;
                    let dayWeather = tripDates[i].weather[0].main;

                    dayDate = moment(dayDate * 1000).format('DD-MM-YYYY');

                    const dayWeaterWrapper = $("<div>");
                    const dayWeatherDate = $("<p>");
                    const dayWeatherTemp = $("<p>");
                    const dayWeatherCond = $("<span>");

                    if ($.inArray(dayWeather, condWindy) > -1) {
                        console.log("wind");
                        dayWeatherCond.append("<i class='fas fa-wind'></i>");

                    }
                    if ($.inArray(dayWeather, condSunny) > -1) {
                        dayWeatherCond.append("<i class='fas fa-sun'></i>");

                    }
                    if ($.inArray(dayWeather, condRainy) > -1) {
                        console.log("rain");
                        dayWeatherCond.append("<i class='fas fa-cloud'></i>");

                    }

                    dayWeatherDate.text(dayDate);
                    dayWeatherTemp.text(dayTemp);

                    dayWeaterWrapper.append(dayWeatherDate, dayWeatherTemp, dayWeatherCond);
                    $("#itemsList").append(dayWeaterWrapper);

                }
                //create list of cloathes acording to temp and type of trip.
                if (avgTemp < 16) {
                    if (valType === "beach") {
                        let resultList = beach.windy;
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let item = resultList[i];

                            let bagWrapper = $("<p data-item =" + item + ">");

                            bagWrapper.text(item);

                            let addBtn = $("<span class='plus button btn-plus-min'>+</span>");
                            let minBtn = $("<span class='min button btn-plus-min'>-</span>");


                            let showQtdItem = $("<span class='qtd-item'>");

                            showQtdItem.text(qtdItem);

                            bagWrapper.append(showQtdItem, addBtn, minBtn);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "city") {
                        let resultList = city.windy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "country") {
                        let resultList = country.windy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                }
                if (avgTemp > 16 && avgTemp < 22) {
                    if (valType === "beach") {
                        let resultList = beach.rainy;
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "city") {
                        let resultList = city.rainy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "country") {
                        let resultList = country.rainy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                }
                if (avgTemp > 22) {
                    if (valType === "beach") {
                        let resultList = beach.sunny;
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "city") {
                        let resultList = city.sunny;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);
                        }
                    }
                    if (valType === "country") {
                        let resultList = country.sunny;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                }



            })



        })
    } else {
        alert("Select an end date 8 days from today.")
    }





})

$(".plus").on("click", function() {
        let $btnItem = $(this);

        console.log();
    })
    //


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}