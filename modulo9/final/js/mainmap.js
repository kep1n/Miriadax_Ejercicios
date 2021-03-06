var map, lat, lng;

  $(function(){

    var origen =[];
    
    function enlazarMarcador(e){
      //Definimos la última latitud y longitud en el caso de que tengamos coordenadas en nuestra variable
      if (rutaParse.length > 0) {
        lat = rutaParse[rutaParse.length-1][0];
        lng = rutaParse[rutaParse.length-1][1];
      }
      // muestra ruta entre marcas anteriores y actuales
      map.drawRoute({
        origin: [lat, lng],  // origen en coordenadas anteriores
        // destino en coordenadas del click o toque actual
        destination: [e.latLng.lat(), e.latLng.lng()],
        travelMode: 'driving',
        strokeColor: '#ff0000',
        strokeOpacity: 0.6,
        strokeWeight: 5
      });

      lat = e.latLng.lat();   // guarda coords para marca siguiente
      lng = e.latLng.lng();
  
      map.addMarker({
        lat: lat, 
        lng: lng
      });

      points.push([lat,lng]);
      localStorage.route = JSON.stringify(points);
      rutaParse = JSON.parse(localStorage.route);
    };
    //Esta función se ejecuta tantas veces como arrays de puntos entren y genera la ruta a partir de los
    //puntos guardados en localStorage.
    function enlazarMarcador_(i){
      // muestra ruta entre marcas anteriores y actuales
      map.drawRoute({
        origin: rutaParse[i-1],  // origen en coordenadas anteriores
        // destino en coordenadas del click o toque actual
        destination: rutaParse[i],
        travelMode: 'driving',
        strokeColor: '#000000',
        strokeOpacity: 0.6,
        strokeWeight: 5
      });

      map.addMarker({
        lat: rutaParse[i][0], 
        lng: rutaParse[i][1]
      });
    };

    function geolocalizar(){
      GMaps.geolocate({
        success: function(position){
          lat = position.coords.latitude;  // guarda coords en lat y lng
          lng = position.coords.longitude;
          points = [[lat,lng]];
          origen = [lat,lng];

          map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
            el: '#map',
            lat: lat,
            lng: lng,
            click: enlazarMarcador,
            tap: enlazarMarcador
          });
          map.addMarker({
            lat: lat,
            lng: lng
          });  // marcador en [lat, lng]
        },
        error: function(error) {
          alert('Geolocalización falla: '+error.message);
        },
        not_supported: function(){
          alert("Su navegador no soporta geolocalización");
        }
      });
    };

    var inicializar = $('#restaurar');
    inicializar.on("click", function() {
      answer = confirm("¿Estás seguro de querer restaurar la memoria local?");
      if(answer) {
        localStorage.clear();
        location.reload();
      } else {
        alert("Keep coding!")
      }      
    });
    /*Al cargar la página se verifica si localStorage está vacío u ocupado con información anterior.
    Si la memoria está ocupada, se crea el mapa el marcador y se ejecuta enlazarMarcador_ tantas veces
    arrays estén guardados */
    if(localStorage.route) {
      rutaParse = JSON.parse(localStorage.route);
      points = rutaParse;
      origen = rutaParse[0];
      
      map = new GMaps({  // muestra mapa centrado en coords [lat, lng]
        el: '#map',
        lat: rutaParse[0][0],
        lng: rutaParse[0][1],
        click: enlazarMarcador,
        tap: enlazarMarcador
      });
      map.addMarker({
        lat: rutaParse[0][0], 
        lng: rutaParse[0][1]
      });
      for(var i = 1; i < JSON.parse(localStorage.route).length; i++) {
       enlazarMarcador_(i);
      }
      origen = rutaParse[1]; //cambia el origen al último punto en el caso de que se recargue la página, haciendo
      //que el último punto del array sea el origen de la siguiente ruta y evitando que siempre tenga el mismo origen.
    } else {
      rutaParse = [];
      geolocalizar(); //ejecuta la función correspondiente a la carga inicial
    }
    // geolocalizar();

    var compactar = $('#compactar');
    compactar.on("click", function(){
      map.removeMarkers();
      map.removePolylines();
      
      map.addMarker({
        lat: origen[0],
        lng: origen[1]
      });
      map.addMarker({
        lat: rutaParse[rutaParse.length-1][0],
        lng: rutaParse[rutaParse.length-1][1]
      });

      map.drawRoute({
        origin: origen,        
        destination: [rutaParse[rutaParse.length-1][0], rutaParse[rutaParse.length-1][1]],
        travelMode: 'driving',
        strokeColor: '#00ff00',
        strokeOpacity: 0.6,
        strokeWeight: 5
      });

      newPoints =[origen, rutaParse[rutaParse.length-1]];
      localStorage.route = JSON.stringify(newPoints);
      rutaParse = JSON.parse(localStorage.route);
    });
  });