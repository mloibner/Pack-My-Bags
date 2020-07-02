const urlinfo = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $("select");
let dailyForcast = [];

const urlAPI = "https://api.openweathermap.org/data/2.5/onecall?";

let result = {};

let qtdItem = {};

let country = {
    "windy": ['Parker Jacket', 'Jeans', 'Socks', 'Skivy', 'Scalf'],
    "rainy": ['Sweater', 'Gumboots', 'Jeans', 'Skivy', 'Flanno'],
    "sunny": ['Shorts', 'T-Shirt', 'Hat', 'Singlet', 'Sneakers']
}
let city = {
  windy: ["Coat", "Slacks", "Socks", "Button-Up/Blouse", "Cardigan"],
  rainy: ["Jumper", "Boots", "Slacks", "Skivy", "Shirt"],
  sunny: ["Shorts/Skirt", "T-Shirt", "Hat", "Suncream", "Sandals"],
};
let beach = {
    "windy": ['Parker Jacket', 'Tracksuit', 'Socks', 'Swim-Suit/Boardies', 'Scalf'],
    "rainy": ['Swim-Suit/Boardies', 'Thongs', 'Hoodie', 'Shorts', 'Umbrella'],
    "sunny": ['Thongs', 'Singlet', 'Hat', 'Suncream', 'Swim-Suit/Boardies']
}
let other = ['Suncream', 'Umbrella']

$("#travelInformation").on("submit", function(event) {
    event.preventDefault();

              bagWrapper.text(item);

              let addBtn = $("<span class='plus button btn-plus-min'>+</span>");
              let minBtn = $("<span class='min button btn-plus-min'>-</span>");

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

              let showQtdItem = $("<span class='qtd-item'>");

              showQtdItem.text(qtdItem);

              bagWrapper.append(showQtdItem, minBtn, addBtn);

              $("#itemsList").append(bagWrapper);
            }
          }
          if (valType === "country") {
            let resultList = country.windy;
            // console.log(resultList);
            for (let i = 0; i < resultList.length; i++) {
              let item = resultList[i];

              let bagWrapper = $("<p data-item =" + item + ">");

              bagWrapper.text(item);

              let addBtn = $("<span class='plus button btn-plus-min'>+</span>");
              let minBtn = $("<span class='min button btn-plus-min'>-</span>");

              let showQtdItem = $("<span class='qtd-item'>");

              showQtdItem.text(qtdItem);

              bagWrapper.append(showQtdItem, minBtn, addBtn);

              $("#itemsList").append(bagWrapper);
            }
          }
        }
        if (avgTemp > 16 && avgTemp < 22) {
          if (valType === "beach") {
            let resultList = beach.rainy;
            //console.log(resultList);
            for (let i = 0; i < resultList.length; i++) {
              let item = resultList[i];

              let bagWrapper = $("<p data-item =" + item + ">");

              bagWrapper.text(item);

              let addBtn = $("<span class='plus button btn-plus-min'>+</span>");
              let minBtn = $("<span class='min button btn-plus-min'>-</span>");

                //arrays with the weather conditions.
                const condWindy = ["Mist", "Smoke", "Haze", "Dust", "Fog", "Sand", "Dust", "Ash", "Squall", "Tornado", "Clouds"];
                const condSunny = ["Clear"];
                const condRainy = ["Snow", "Rain", "Drizzle", "Thunderstorm"];

                // for to show the info of the days of trip
                for (let i = 0; i < tripDates.length; i++) {
                    let dayDate = tripDates[i].dt;
                    let dayTemp = tripDates[i].temp.day;
                    let dayWeather = tripDates[i].weather[0].main;

              let bagWrapper = $("<p data-item =" + item + ">");

              bagWrapper.text(item);

                    if ($.inArray(dayWeather, condWindy) > -1) {
                        dayWeatherCond.append("<i class='fas fa-wind'></i>");
                    }
                    if ($.inArray(dayWeather, condSunny) > -1) {
                        dayWeatherCond.append("<i class='fas fa-sun'></i>");
                    }
                    if ($.inArray(dayWeather, condRainy) > -1) {;
                        dayWeatherCond.append("<i class='fas fa-cloud'></i>");
                    }

              $("#itemsList").append(bagWrapper);
            }
          }
          if (valType === "country") {
            let resultList = country.rainy;
            // console.log(resultList);
            for (let i = 0; i < resultList.length; i++) {
              let item = resultList[i];

              let bagWrapper = $("<p data-item =" + item + ">");

                }
                //create list of cloathes acording to temp and type of trip.
                if (avgTemp < 16) {
                    if (valType === "beach") {
                        let resultList = beach.windy;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let item = resultList[i];
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

              let bagWrapper = $("<p data-item =" + item + ">");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

              bagWrapper.text(item);

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

              let addBtn = $("<span class='plus button btn-plus-min'>+</span>");
              let minBtn = $("<span class='min button btn-plus-min'>-</span>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

                            listWrapper.append(itemWrapper);

                        }
                        $("#itemsList").append(listWrapper);
                    }
                }
                if (avgTemp > 22) {
                    if (valType === "beach") {
                        let resultList = beach.sunny;
                        let listWrapper = $("<ul class='list-wrapper'>");
                        //console.log(resultList);
                        for (let i = 0; i < resultList.length; i++) {

                            let item = resultList[i];
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

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
                            let itemWrapper = $("<li>");

                            let itemBag = $("<p data-item ='" + item + "'>");

                            itemBag.text(item);

                            let addBtn = $("<button data-item='" + item + "' class='plus button btn-plus-min' type='button'>+</button>");
                            let minBtn = $("<button data-item='" + item + "' class='min button btn-plus-min' type='button'>-</button>");

                            let showQtdItem = $("<span class='qtd-item'>");

                            // itemBag.append(showQtdItem, minBtn, addBtn);

                            itemWrapper.append(itemBag, showQtdItem, minBtn, addBtn);

                            listWrapper.append(itemWrapper);

                        }
                        $("#itemsList").append(listWrapper);
                    }
                }
            })
        })
    } else {
        alert("Select an end date 8 days from today.")
    }
})

//function to add the number of items to bag.
$(".btn-plus-min").on("click", function() {
    console.log("clicked");
    let $btnItem = $(this);

    console.log($btnItem);
    console.log("test");
})

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
