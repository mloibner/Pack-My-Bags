const urlinfo = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $('select');
let dailyForcast = [];

const urlAPI = "https://api.openweathermap.org/data/2.5/onecall?"

let result = {};

let country = {
    "windy": ['parker jacket', 'jeans', 'socks', 'skivy', 'scalf'],
    "rainy": ['raincoat', 'gumboots', 'jeans', 'skivy', 'umbrella'],
    "sunny": ['shorts', 't-shirt', 'hat', 'suncream', 'sneakers']
}
let city = {
    "windy": ['coat', 'slacks', 'socks', 'button-up/blouse', 'cardigan'],
    "rainy": ['trench-coat', 'boots', 'slacks', 'skivy', 'umbrella'],
    "sunny": ['shorts/skirt', 't-shirt', 'hat', 'suncream', 'sandals']
}
let beach = {
    "windy": ['parker jacket', 'tracksuit', 'socks', 'swim-suit/boardies', 'scalf'],
    "rainy": ['swim-suit/boardies', 'thongs', 'hoodie', 'shorts', 'umbrella'],
    "sunny": ['thongs', 'singlet', 'hat', 'suncream', 'swim-suit/boardies']
}

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
                    console.log(responseCity);

                    $("#itemsList").empty();



                    let tripDates = [];
                    let tempDates = [];

                    dailyForcast = responseCity.daily;
                    for (let i = 0; i < dailyForcast.length; i++) {
                        let dates = dailyForcast[i].dt;
                        let temp = dailyForcast[i].temp.day;

                        if (dates > valStartDates && dates < valEndDates) {
                            tripDates.push(dailyForcast[i]);
                            tempDates.push(temp);
                        }
                    }

                    for (let i = 0; i < tripDates.length; i++) {
                        let weatherCondition = tripDates[i].weather[0].main;
                        console.log(weatherCondition);
                    }

                    console.log(tripDates);
                    console.log(tempDates);

                    let sumTemp = 0;

                    for (let i = 0; i < tempDates.length; i++) {
                        sumTemp += parseInt(tempDates[i], 10); //don't forget to add the base
                    }

                    let avgTemp = sumTemp / tempDates.length;

                    console.log("sum of array: " + sumTemp);
                    console.log("avg of array: " + avgTemp);

                    console.log(dailyForcast);

                    console.log("start date: " + valStartDates);
                    console.log("End date: " + valEndDates);

                    let weatherWrapper = $("<h4>");

                    // currentWeather = currentWeather.toUpperCase();

                    weatherWrapper.text("The avg temperature for your trip will be: " + avgTemp);

                    $("#itemsList").append(weatherWrapper);


                    if (~currentWeather.indexOf("clouds") && valType === "beach") {
                        let resultList = beach.windy;
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);





                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("clouds") && valType === "city") {
                        let resultList = city.windy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("clouds") && valType === "country") {
                        let resultList = country.windy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "beach") {
                        let resultList = beach.rainy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);



                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "city") {
                        let resultList = city.rainy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if ((~currentWeather.indexOf("rain") || ~currentWeather.indexOf("thunderstorm") || ~currentWeather.indexOf("snow") || ~currentWeather.indexOf("mist")) && valType === "country") {
                        let resultList = country.rainy;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "beach") {
                        let resultList = beach.sunny;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "city") {
                        let resultList = city.sunny;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                    if (~currentWeather.indexOf("sky") && valType === "country") {
                        let resultList = country.sunny;
                        // console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let bagWrapper = $("<p>");

                            bagWrapper.text(resultList[i]);

                            $("#itemsList").append(bagWrapper);

                        }
                    }
                })



            })
        } else {
            alert("Select an end date 8 days from today.")
        }





    })
    //