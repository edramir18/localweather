function convertCoordToCoordMin(position){    
    const myPosition =  {
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
    return myPosition;
}

$(document).ready( function() {
    const localidad = document.getElementById('localidad');    
    
    const success = function(position) {
        const myPosition = convertCoordToCoordMin(position);
        localidad.textContent = myPosition.latitude.grades + "°" +
            myPosition.latitude.minutes + "'" + myPosition.latitude.symbol + 
            " " + myPosition.longitude.grades + "°" +
            myPosition.longitude.minutes + "'" + myPosition.longitude.symbol;
    };
    const err = function () {
        localidad.textContent = 'prueba';
        localidad.classList.add('font-italic');
    }
    
    if (!localidad){
        return;
    }
    if (!navigator.geolocation){
        err()
        return;
    }

    navigator.geolocation.getCurrentPosition(success, err);
});