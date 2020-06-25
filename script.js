const urlAPI = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $(".radio");

$("#travelInformation").on("submit", function() {
        event.preventDefault();




        let valLocation = travelLocation.val();
        let valStartDates = startDates.val();
        let valEndDates = endDates.val();
        let valType = typeTravel.val();

        const searchURL = urlAPI + "q=" + valLocation + "&appid=" + apiKey;


        valEndDates = moment(valEndDates).unix();

        console.log(valEndDates);
        console.log(valStartDates);

        let currentDay = moment().unix();
        //currentDay = currentDay.substring(0, 10);
        console.log(currentDay);

        let maxEndDate = moment().add(5, "days").unix();

        console.log(maxEndDate);

        if (maxEndDate > valEndDates) {

            $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function(result) {
                console.log(result);
            })
        } else {

        }








    })
    //