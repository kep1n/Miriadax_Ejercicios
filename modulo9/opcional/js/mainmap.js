var map, lat, lng;


  $(function(){

    

    function enlazarMarcador(e){

      // muestra ruta entre marcas anteriores y actuales
      map.drawRoute({
        origin: [lat, lng],  // origen en coordenadas anteriores
        // destino en coordenadas del click o toque actual
        destination: [e.latLng.lat(), e.latLng.lng()],
        travelMode: 'driving',
        strokeColor: '#000000',
        strokeOpacity: 0.6,
        strokeWeight: 5
      });



      lat = e.latLng.lat();   // guarda coords para marca siguiente
      lng = e.latLng.lng();

      points.push([lat,lng]);
      localStorage.route = JSON.stringify(points);
      // rutaString = localStorage.route;
      rutaParse = JSON.parse(localStorage.route);

      map.addMarker({
        lat: lat, 
        lng: lng
      });

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
          localStorage.route = localStorage.route || JSON.stringify(points);
          // var routeStringfied = JSON.stringify(localStorage.route);
          

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
      points = [];
      rutaParse = JSON.parse(localStorage.route);
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
    } else {
      geolocalizar(); //ejecuta la función correspondiente a la carga inicial
    }
    // geolocalizar();
  });