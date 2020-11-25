//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e){

 var emailRegistrado = document.getElementById("emailuser").value =sessionStorage.getItem('userName');
 document.getElementById("emailuser").innerHTML= emailRegistrado;


 

 document.getElementById("guardar").addEventListener("click",function(){
    DataUsers = JSON.parse(localStorage.getItem("PerfilUsuario"));

     var nameUser = document.getElementById("nYa").value;
     var age = document.getElementById("edad").value;
     var contacto = document.getElementById("cel").value;
     var useractual = sessionStorage.getItem('userName');
     var bandera= false;
    
 for(i=0; i<DataUsers.length; i++){

    if(DataUsers[i].email == useractual){
        DataUsers[i].nombreCompleto = nameUser;
        DataUsers[i].edad = age;
        DataUsers[i].contact = contacto;
        bandera= true;
        break;
    }
 }
 if (bandera = true){

       localStorage.setItem("PerfilUsuario",JSON.stringify(DataUsers));
    };

});

newDataUser = JSON.parse(localStorage.getItem("PerfilUsuario"));
for(var i=0; i<newDataUser.length; i++){

    if(newDataUser[i].email == sessionStorage.getItem('userName')){
       
        var nombreRegistrado = document.getElementById("nYa").value = newDataUser[i].nombreCompleto;
        document.getElementById("nYa").innerHTML= nombreRegistrado;
        if (nombreRegistrado !== ""){
         document.getElementById("presentacionPerfil").innerHTML = nombreRegistrado;
        }
        var edadRegistrado = document.getElementById("edad").value= newDataUser[i].edad;
        document.getElementById("edad").innerHTML= edadRegistrado;
        var celRegistrado = document.getElementById("cel").value =newDataUser[i].contact;
        document.getElementById("cel").innerHTML= celRegistrado;

        break;
    };
}; 

//imagen Usuario:
/* 
var imagenU = document.getElementById("imageUser");
imagenU.addEventListener("load", function () {
    var imgCanvas = document.createElement("canvas"),
        imgContext = imgCanvas.getContext("2d");
        imgCanvas.width = imagenU.width;
        imgCanvas.height = imagenU.height;

        imgContext.drawImage(imagenU, 0, 0, imagenU.width, imagenU.height);

        var imgAsDataURL = imgCanvas.toDataURL("image/png");
        
        try {
            localStorage.setItem("ImagenUsuario", imgAsDataURL);
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false); 

    var storageFiles = JSON.parse(localStorage.getItem("ImagenUsuario")) || {},
    elephant = document.getElementById("imageUser"),
    storageFilesDate = storageFiles.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

// Compare date and create localStorage if it's not existing/too old   
if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
    // Take action when the image has loaded
    elephant.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

        // Make sure canvas is as big as the picture
        imgCanvas.width = elephant.width;
        imgCanvas.height = elephant.height;

        // Draw image into canvas element
        imgContext.drawImage(elephant, 0, 0, elephant.width, elephant.height);

        // Save image as a data URL
        storageFiles.elephant = imgCanvas.toDataURL("image/png");

        // Set date for localStorage
        storageFiles.date = todaysDate;

        // Save as JSON in localStorage
        try {
            localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false);

    // Set initial image src    
    elephant.setAttribute("src", "elephant.png");
}
else {
    // Use image from localStorage
    elephant.setAttribute("src", storageFiles.elephant);
}

 */
}); 
 
//if(nameUser>3 && age>1 && contacto>=9){
// return alert("Tus datos han sido guardados");
//};