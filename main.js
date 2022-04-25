let map;
let markers = [];
let currentPosition;
let currentMarker;

function initMap(){
    // Pegar elemento no HTML via javascript
    const mapElement = document.getElementById("map");

    // Buscar localização usando api navigator
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //Criar instancia do Mapa com elemento html
            map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: currentPosition,
            });

            //Criar marker com a localização atual do mapa
            currentMarker = new google.maps.Marker({
                map: map,
                position: currentPosition,
                label: "Minha casa"
            });

        });
        
    } else {
        alert("Sem suporte a Geolocalização");
    }

    initAutoComplete();
}

function initAutoComplete(){
    const inputOrigin = document.getElementById("origin");

    const options = {
        types: ["(cities)"]
    };

    // Autocomplete Input Origin
    let autoCompleteOrigin = new google.maps.places.Autocomplete(
        inputOrigin, 
        options
    );

    autoCompleteOrigin.addListener("place_changed", () => {
        const place = autoCompleteOrigin.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        const origin = {lat, lng};

        const originMarker = new google.maps.Marker({
            position: origin,
            map: map,
            label: "Endereço de Origem"
        });

        originMarker.addListener("click", () => {
            console.log("Marker Clicado");
        });

        markers.push(originMarker);
        map.setCenter(origin);
    });


    // Input Autocomplete Destination
}