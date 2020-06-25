const urlAPI = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const dates = $("#inputDates");
const typeTravel = $(".radio");

$("#travelInformation").on("submit", function() {
        event.preventDefault();


        let valLocation = travelLocation.val();
        let valDates = dates.val();
        let valType = typeTravel.val();

        const searchURL = urlAPI + "q=" + valLocation + "&appid=" + apiKey;

        $.ajax({
            url: searchURL,
            method: "GET"
        }).then(function(result) {
            console.log(result);
        })



    })
    //