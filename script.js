const urlinfo = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $("select");
let dailyForcast = [];

const urlAPI = "https://api.openweathermap.org/data/2.5/onecall?";

let result = {};

let bagItem = {};

let country = {
    windy: ["Parker Jacket", "Jeans", "Socks", "Skivy", "Scalf"],
    rainy: ["Sweater", "Gumboots", "Jeans", "Skivy", "Flanno"],
    sunny: ["Shorts", "T-Shirt", "Hat", "Singlet", "Sneakers"],
};
let city = {
    windy: ["Coat", "Slacks", "Socks", "Button-Up/Blouse", "Cardigan"],
    rainy: ["Jumper", "Boots", "Slacks", "Skivy", "Shirt"],
    sunny: ["Shorts/Skirt", "T-Shirt", "Hat", "Suncream", "Sandals"],
};
let beach = {
    windy: ["Parker Jacket", "Tracksuit", "Socks", "Swim-Suit/Boardies", "Scalf"],
    rainy: ["Swim-Suit/Boardies", "Thongs", "Hoodie", "Shorts", "Umbrella"],
    sunny: ["Thongs", "Singlet", "Hat", "Suncream", "Swim-Suit/Boardies"],
};
let other = ["Suncream", "Umbrella"];

$("#travelInformation").on("submit", function(event) {
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
            method: "GET",
        }).then(function(response) {
            result = response;
            console.log(result);

            const lon = result.city.coord.lon;
            const lat = result.city.coord.lat;

            const searchCity =
                urlAPI +
                "lat=" +
                lat +
                "&lon=" +
                lon +
                "&exclude=hourly,minutelyy&units=metric&appid=" +
                apiKey;

            $.ajax({
                url: searchCity,
                method: "GET",
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

                weatherWrapper.append(
                    "The average temperature of your trip is: " + avgTemp + "&#8451;"
                );

                $("#itemsList").append(weatherWrapper);

                //arrays with the weather conditions.
                const condWindy = [
                    "Mist",
                    "Smoke",
                    "Haze",
                    "Dust",
                    "Fog",
                    "Sand",
                    "Dust",
                    "Ash",
                    "Squall",
                    "Tornado",
                    "Clouds",
                ];
                const condSunny = ["Clear"];
                const condRainy = ["Snow", "Rain", "Drizzle", "Thunderstorm"];

                // for to show the info of the days of trip
                for (let i = 0; i < tripDates.length; i++) {
                    let dayDate = tripDates[i].dt;
                    let dayTemp = tripDates[i].temp.day;
                    let dayWeather = tripDates[i].weather[0].main;

                    dayDate = moment(dayDate * 1000).format("DD-MM-YYYY");

                    const dayWeaterWrapper = $("<div>");
                    dayWeaterWrapper.addClass("weatherDiv");
                    const dayWeatherDate = $("<p>");
                    const dayWeatherTemp = $("<p>");
                    const dayWeatherCond = $("<span>");

                    if ($.inArray(dayWeather, condWindy) > -1) {
                        dayWeatherCond.append("<i class='fas fa-wind'></i>");
                    }
                    if ($.inArray(dayWeather, condSunny) > -1) {
                        dayWeatherCond.append("<i class='fas fa-sun'></i>");
                    }
                    if ($.inArray(dayWeather, condRainy) > -1) {
                        dayWeatherCond.append("<i class='fas fa-cloud'></i>");
                    }

                    dayWeatherDate.text(dayDate);
                    dayWeatherTemp.text(dayTemp);

                    dayWeaterWrapper.append(
                        dayWeatherDate,
                        dayWeatherTemp,
                        dayWeatherCond
                    );
                    $("#itemsList").append(dayWeaterWrapper);
                }
                //create list of cloathes acording to temp and type of trip.
                if (avgTemp < 16) {
                    if (valType === "beach") {
                        let resultList = beach.windy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "city") {
                        let resultList = city.windy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "country") {
                        let resultList = country.windy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                }
                if (avgTemp > 16 && avgTemp < 22) {
                    if (valType === "beach") {
                        let resultList = beach.rainy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min'  type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "city") {
                        let resultList = city.rainy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "country") {
                        let resultList = country.rainy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                }
                $('#myBtn').removeClass('hide')
                if (avgTemp > 22) {
                    if (valType === "beach") {
                        let resultList = beach.sunny;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "city") {
                        let resultList = city.sunny;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item'data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                    if (valType === "country") {
                        let resultList = country.sunny;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {
                            let item = resultList[i];
                            let itemWrapper = $("<li class='large-2 cell'>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='plus button btn-plus-min' type='button'>+</button>"
                            );
                            let minBtn = $(
                                "<button data-item='" +
                                item +
                                "' class='min button btn-plus-min' type='button'>-</button>"
                            );

                            let showQtdItem = $("<input class='qtd-item' data-item='" +
                                item +
                                "' value='1' type='number'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem);

                            listWrapper.append(itemWrapper);
                        }
                        $("#itemsList").append(listWrapper);
                    }
                }
            });
        });
    } else {
        alert("Select an end date 8 days from today.");
    }
});

// //function to add the number of items to bag.
// $(document).on("click", ".btn-plus-min", function() {

//     let count = 1;

//     let $btnItem = $(this);
//     let itemName = $btnItem.attr("data-item");

//     if ($btnItem.hasClass("plus")) {
//         count++;
//     }
//     if ($btnItem.hasClass("min")) {
//         if (count > 0) {
//             count--;
//         }
//     }

//     // bagItem.item = { name: itemName, qtd: count };
//     bagItem = new bagItem(count);

//     console.log(itemName);
//     console.log(bagItem);
// });

// function to show info and backpack.
$(document).on("click", "#myBtn", function() {
    const item = $(".list-wrapper li");
    const modalList = $(".backpack-list");
    const dest = $(".Destination");
    const dates = $(".Dates");
    const type = $(".type");


    let valLocation = travelLocation.val();
    let valStartDates = startDates.val();
    let valEndDates = endDates.val();
    valStartDates = moment(valStartDates).format("DD MM YYYY");
    valEndDates = moment(valEndDates).format("DD MM YYYY");

    let valType = typeTravel.val();

    dest.text("The destination of your trip is: " + valLocation);
    dates.text("your trip will start in " + valStartDates + " and end on " + valEndDates);
    type.text("the type of travel is: " + valType);

    modalList.append(item);

});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    location.reload();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};