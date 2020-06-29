const urlAPI = "https://api.openweathermap.org/data/2.5/forecast?";
const apiKey = "dee95c5e85271312989787cc5576e747";
const travelLocation = $("#inputLocation");
const startDates = $("#inputStartDates");
const endDates = $("#inputEndDates");
const typeTravel = $(".radio");

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

        const searchURL = urlAPI + "q=" + valLocation + "&appid=" + apiKey;

        valEndDates = moment(valEndDates).unix();

        let maxEndDate = moment().add(5, "days").unix();

        console.log(maxEndDate);

        if (maxEndDate > valEndDates) {
            $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function(response) {
                result = response;
            })
        } else {
            alert("Select an end date 5 days from today.")
        }

        let







    })
    //