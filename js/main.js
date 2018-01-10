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

function positionSuccess(position){
    const localidad = document.getElementById('localidad');
    const myPosition = convertCoordToCoordMin(position);
    const positionString = myPosition.latitude.grades + "°" +
        myPosition.latitude.minutes + "'" + myPosition.latitude.symbol + 
        " " + myPosition.longitude.grades + "°" +
        myPosition.longitude.minutes + "'" + myPosition.longitude.symbol;    
    
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