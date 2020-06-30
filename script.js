const urlinfo = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $('select');

const urlAPI = "https://api.openweathermap.org/data/2.5/onecall?"

let result = {};

let country = {
    "windy": ['Parker Jacket', 'Jeans', 'Socks', 'Skivy', 'Scalf'],
    "rainy": ['Raincoat', 'Gumboots', 'Jeans', 'Skivy', 'Umbrella'],
    "sunny": ['Shorts', 'T-Shirt', 'Hat', 'Suncream', 'Sneakers']
}
let city = {
    "windy": ['Coat', 'Slacks', 'Socks', 'Button-Up/Blouse', 'Cardigan'],
    "rainy": ['Trench-Coat', 'Boots', 'Slacks', 'Skivy', 'Umbrella'],
    "sunny": ['Shorts/Skirt', 'T-Shirt', 'Hat', 'Suncream', 'Sandals']
}
let beach = {
    "windy": ['Parker Jacket', 'Tracksuit', 'Socks', 'Swim-Suit/Boardies', 'Scalf'],
    "rainy": ['Swim-Suit/Boardies', 'Thongs', 'Hoodie', 'Shorts', 'Umbrella'],
    "sunny": ['Thongs', 'Singlet', 'Hat', 'Suncream', 'Swim-Suit/Boardies']
}

$("#travelInformation").on("submit", function() {
        event.preventDefault();

        let valLocation = travelLocation.val();
        let valStartDates = startDates.val();
        let valEndDates = endDates.val();
        let valType = typeTravel.val();

        const searchURL = urlinfo + "q=" + valLocation + "&appid=" + apiKey;



        valEndDates = moment(valEndDates).unix();

        let maxEndDate = moment().add(5, "days").unix();

        console.log(maxEndDate);

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
                    console.log(responseCity);

                    $("#itemsList").empty();

                    let currentWeather = responseCity.current.weather[0].description;
                    let currentTemp = responseCity.current.temp;

                    console.log(currentWeather);
                    console.log(currentTemp);

                    let weatherWrapper = $("<h4>");

                    // currentWeather = currentWeather.toUpperCase();

                    weatherWrapper.text("The conditions for your trip will be: " + currentWeather);

                    $("#itemsList").append(weatherWrapper);


                    if (~currentWeather.indexOf("clouds") && valType === "beach") {
                        let resultList = beach.windy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);





                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("clouds") && valType === "city") {
                        let resultList = city.windy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("clouds") && valType === "country") {
                        let resultList = country.windy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "beach") {
                        let resultList = beach.rainy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);



                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "city") {
                        let resultList = city.rainy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "country") {
                        let resultList = country.rainy;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "beach") {
                        let resultList = beach.sunny;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "city") {
                        let resultList = city.sunny;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "country") {
                        let resultList = country.sunny;
                        console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                })



            })
        } else {
            alert("Select an end date 5 days from today.")
        }





    })
    //
