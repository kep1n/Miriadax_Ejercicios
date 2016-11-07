var galeria = [
   { persona:"Buddha - बुद्धा",
     frase:"En la confrontación entre el arrollo y la roca, el arrollo siempre ganará, no por la fuerza, sino por la persistencia.",
     foto:"http://www.imagexia.com/img/Cara-de-Buda.jpg"
   },
   { persona:"Khalil Gibran - جبران خليل جبران بن ميخائل بن سعد",
     frase:"El silencio del envidioso está lleno de ruidos.",
     foto:"http://www.hannaharendtcenter.org/wp-content/uploads/2015/05/111.jpg"
   },
   { persona:"Confucio - 孔子",
     frase: "Todo tiene belleza pero no todo el mundo la puede ver.",
     foto:"http://3.bp.blogspot.com/-VlsuMSoivLU/VeMlD-LymUI/AAAAAAABKPU/Q8PYwsFbqxg/s1600/confucio.jpeg"
   },
   { persona:"Lev Nikoláievich Tolstói - Лев Николаевич Толстой",
     frase:"Mi felicidad consiste en que sé apreciar lo que tengo y no deseo con exceso lo que no tengo.",
     foto:"http://malba.s3-website-sa-east-1.amazonaws.com/wp-content/uploads/2014/09/tolstoi-05.jpg"
   },
   { persona:"Platón - Πλάτων",
     frase:"El más importante y principal negocio público es la buena educación de la juventud.",
     foto:"https://s-media-cache-ak0.pinimg.com/236x/ee/c4/f3/eec4f3420f7024c58f1b44de233d8ecd.jpg"
   },
   { persona:"Henrik Ibsen - hɛnɾɪk ˈjoːhɑn ˈɪpsən",
     frase:"Si dudas de ti mismo, estás vencido de antemano.",
     foto:"https://ebooks.adelaide.edu.au/i/ibsen/henrik/gosse/images/bust2.jpg"
   }
];

localStorage.galeriaInicial = JSON.stringify(galeria);

localStorage.galeriaAdd = localStorage.galeriaAdd || JSON.stringify(galeria);

var locGaleria = JSON.parse(localStorage.galeriaAdd);

var t, actual;

function select(i){
     actual = i;

    $("nav a")
      .removeClass("on off")
      .addClass(function(j){return(j===i)?"on":"off";});

    $("#persona").html(locGaleria[i].persona);
    $("#frase").html(locGaleria[i].frase);
    $("#foto").attr("src", locGaleria[i].foto);

    clearTimeout(t);
    t = setTimeout( function(){select((i + 1) % locGaleria.length);}, 3000);
  }

  function generar_selector(){ // regenera la botonera
    var selector = $("#selector");

    selector.html("");
    
    locGaleria.forEach(function(elem,i) {
      selector.append("<li><a onClick='select("+i+")'></a></li>");
    });
  }

  //Función confirmar que alerta de los cambios a realizar. Si se clicka ok localStorage se resetea al estado inicial
  //Si no, se ejecuta una alerta de que no se ha restaurado.
  function confirmar(){
    answer = confirm("IMPORTANTE: \n ¿Está seguro de querer restaurar los cambios a su estado inicial?");
    if (answer) {
      localStorage.galeriaAdd = localStorage.galeriaInicial;
      location.reload();
    } else {
      alert("No se ha restaurado al estado inicial");
    }
  }

  $(function (){

    //Creamos las variables para facilitar el acceso al DOM
    var edicion = $("#editar");
    var nuevaEntrada = $("#nuevo");
    var añadir = $("#nuevo2");
    var guardar = $("#guardar");
    var borrar = $("#borrar");
    var restaurar = $("#restaurar");

    generar_selector();

    //Al clickar sobre la imagen o flechita de edición, se hacen visibles los botones de guardado y borrado. Además
    //el texto de los bloques se actualiza con el que está en ese momento en pantalla.
    edicion.on("click", function(){
      clearTimeout(t);
      
      añadir.css("visibility", "hidden");
      guardar.css("visibility", "visible");
      borrar.css("visibility", "visible");
      $("#persona_d").html(locGaleria[actual].persona);
      $("#frase_d").html(locGaleria[actual].frase);
      $("#foto_d").html(locGaleria[actual].foto);
      $("#datos").css("display", "block");
    });

    //Botón + de nueva entrada que crea los bloques vacíos y oculta el botón de guardado y borrado.
    nuevaEntrada.click(function(){
      clearTimeout(t);
      añadir.css("visibility", "visible");
      guardar.css("visibility", "hidden");
      borrar.css("visibility", "hidden");
      $("#persona_d").html("Introduce el nombre de la persona...");
      $("#frase_d").html("Introduce la cita o frase...");
      $("#foto_d").html("Incluye la url con la foto de la persona...");
      $("#datos").css("display", "block");

    });

    // $("#persona_d").on("paste",function(e){
    //   // cancel paste
    //   e.preventDefault();

    // // get text representation of clipboard
    //   var text = e.clipboardData.getData("text/plain");

    // // insert text manually
    //   document.execCommand("insertHTML", false, text);
    // });

    //Este es el botón que añadirá la cita al carrusel
    añadir.on("click", function(){
      actual = locGaleria.push({
         persona:$("#persona_d").html(),
         frase:$("#frase_d").html(),
         foto:$("#foto_d").html()
      }) - 1;

      $("#datos").css("display", "none");

      localStorage.galeriaAdd = JSON.stringify(locGaleria);

      generar_selector();

      select(actual);
    });

    //Evento guardar. Se cambia la información del html (parte superior) por la contenida y recientemente editada
    //en los div de edición (persona_d, frase_d y foto_d).
    guardar.on("click",function(){
      $("#persona").html($("#persona_d").html());
      $("#frase").html($("#frase_d").html());
      $("#foto").html($("#foto_d").html());

      //Se cambia la información del elemento de la lista para que sea permanente mientras hayamos hecho cambios
      locGaleria[actual].persona = $("#persona_d").html();
      locGaleria[actual].frase = $("#frase_d").html();
      locGaleria[actual].foto = $("#foto_d").html();

      $("#datos").css("display", "none");
      select(actual);

    });

    //Al presionar sobre el botón borrar se borra el índice actual y se regenera el selector 
    borrar.on("click",function(){
      locGaleria.splice(actual,1);
      $("#datos").css("display", "none");
      localStorage.galeriaAdd = JSON.stringify(locGaleria);
      generar_selector();

      select(0);
    });

    restaurar.on("click", confirmar);

    select(0);
  });