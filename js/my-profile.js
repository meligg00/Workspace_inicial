//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e){

document.getElementById("emailuser").innerHTML= sessionStorage.getItem('userName');




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

/* newDataUser = JSON.parse(localStorage.getItem("PerfilUsuario"));

for(i=0; i<newDataUser.length; i++){

    if(newDataUser[i].email == sessionStorage.getItem('userName')){
       
        document.getElementById("nYa").innerHTML = newDataUser.nombreCompleto;
        document.getElementById("edad").innerHTML = newDataUser.edad;
        document.getElementById("cel").innerHTML= newDataUser.contact;

        break;
    };
}; */




}); 
 
//if(nameUser>3 && age>1 && contacto>=9){
// return alert("Tus datos han sido guardados");
//};