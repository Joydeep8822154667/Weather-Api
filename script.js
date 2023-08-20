const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'acd916563dmsh1fe69d3e38bdd6fp1ace95jsn3be8582c134c',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
var arr = [];
const getWeather = (city) => {
    cityName.innerHTML = city;
    arr.push(city);
    if (arr.length > 4) {
        var numberOfElementsToRemove = arr.length - 4;
        for (var i = 0; i < numberOfElementsToRemove; i++) {
            arr.shift();
        }
        var tbody = document.querySelector(".common-city");

        // Remove all child elements from the tbody
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }
    fetch(url + city, options)
        .then(res => res.json())
        .then(response => {
            cloud_pct.innerHTML = response.cloud_pct
            temp.innerHTML = response.temp
            feels_like.innerHTML = response.feels_like
            humidity.innerHTML = response.humidity
            min_temp.innerHTML = response.min_temp
            max_temp.innerHTML = response.max_temp
            wind_speed.innerHTML = response.wind_speed
            wind_degrees.innerHTML = response.wind_degrees
            sunrise.innerHTML = response.sunrise
            sunset.innerHTML = response.sunset
        })
        .catch(err => console.log(err))
}

const common_city = (city) => {
    var newRow = document.createElement("tr");
    var cells = [
        city, "2", "2", "2", "2", "2", "2", "2", "2", "2", "2"
    ];
    var start = 1;
    fetch(url + city, options).then(res => res.json())
        .then(response => {
            console.log(`Joydeep ur error is ${url + city}`);
            console.log(response);
            cells[start++] = response.cloud_pct
            cells[start++] = response.temp
            cells[start++] = response.feels_like
            cells[start++] = response.humidity
            cells[start++] = response.min_temp
            cells[start++] = response.max_temp
            cells[start++] = response.wind_speed
            cells[start++] = response.wind_degrees
            cells[start++] = response.sunrise
            cells[start++] = response.sunset

            for (var i = 0; i < cells.length; i++) {
                var newCell;
                if (i == 0) {

                    newCell = document.createElement("th");
                }
                else {
                    newCell = document.createElement("td");
                }
                newCell.textContent = cells[i];
                newRow.appendChild(newCell);
            }


        }).catch(err => console.log(err))

    // Loop through the cell values and create new <td> elements


    // Create a new <tbody> element and append the new row to it
    // var newTBody = document.createElement("tbody");
    // newTBody.className = "common-city";
    // newTBody.appendChild(newRow);

    // Find the existing <tbody> element and replace it with the new one
    var existingTBody = document.querySelector(".common-city");

    existingTBody.appendChild(newRow);
    // var table = document.getElementById("myTable");
    // table.replaceChild(newTBody, existingTBody);
}






submit.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(city.value)
    for (var i = 0; i < arr.length; i++) {

        common_city(arr[i]);
    }
})

// getWeather("Kolkata")
