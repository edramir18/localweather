function convertCoordToCoordMin(position){
    const myPosition = {
        longitude: {
            grades: Math.floor(Math.abs(position.coords.longitude))
        },
        latitude: {
            grades: Math.floor(Math.abs(position.coords.latitude))
        }
    };
    if(position.coords.latitude >= 0){
        myPosition.latitude.symbol = 'N';
    }else {
        myPosition.latitude.symbol = 'S';
    }
    if(position.coords.longitude >= 0){
        myPosition.longitude.symbol = 'E';
    }else {
        myPosition.longitude.symbol = 'W';
    }
    myPosition.latitude.minutes = Math.floor(
        60.0 * (Math.abs(position.coords.latitude) - myPosition.latitude.grades));
    myPosition.longitude.minutes = Math.floor(
        60.0 * (Math.abs(position.coords.longitude) - myPosition.longitude.grades));
    myPosition.text = myPosition.latitude.grades + "°" +
        myPosition.latitude.minutes + "'" + myPosition.latitude.symbol +
        " " + myPosition.longitude.grades + "°" +
        myPosition.longitude.minutes + "'" + myPosition.longitude.symbol;
    return myPosition;
}
function positionSuccess(position){    
    const myPosition = convertCoordToCoordMin(position);
    const weatherAPiUrl = "https://fcc-weather-api.glitch.me/api/current?lon=" +
        position.coords.longitude + "&lat=" +
        position.coords.latitude;
    fetch(weatherAPiUrl)
        .then( response => {
            if(!response.ok){
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(json => {
            if (!json){
                throw new Error('Api return no data.');
            }            
            const elm = document.querySelector('#weather img');
            const img = elm.cloneNode(true);
            img.setAttribute("src", json.weather[0].icon);
            elm.parentNode.replaceChild(img, elm);
            document.querySelector('#weather h6').textContent = json.weather[0].description;
            document.querySelector('#temperature h3').textContent = json.main.temp + " °C";
            document.getElementById('localidad').innerHTML = json.name + " (" + json.sys.country + ") <small>" + myPosition.text + "</small>";
        })
        .catch(error => {            
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
}

function positionError(){
    const localidad = document.getElementById('localidad');
    localidad.textContent = 'You browser not support GeoLocalization';
    localidad.classList.add('font-italic');
}

$(document).ready( function() {
    const localidad = document.getElementById('localidad');
    if (!localidad){
        return;
    }
    if (!navigator.geolocation){
        positionError()
        return;
    }
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
});