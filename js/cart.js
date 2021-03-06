
var porcentaje = 0.15 ;
var datosCart= [];

function myPago() {
    var option_value = document.getElementById("select").value;
    if (option_value == "1") {
     $("#myModal").modal();
     }
};


function showArt (artículos){

    let tBody="";

    for ( i=0; i<artículos.length; i++){         
          
      
          let totalPP = artículos[i].count * artículos[i].unitCost;


           tBody+=`<tr id="Fila_`+ i +`">
        
           <th id="Art`+ i +`"><img src="`+ artículos[i].src+`" class="img-thumbnail" width="22%">`+ artículos[i].name+`</th>

           <td id="entrega`+ i +`" style="text-align: justify;"><small><i class="fa fa-check-circle" style="color:rgb(66, 66, 240)"></i>Retiro en tienda <br><i style="color:rgb(66, 66, 240)" class="fa fa-check-circle"></i> Envío </small></td>
       
           <td style="text-align: center;"> <input onchange="actualizarTP(`+i+`)" id="inputCountA`+ i +`" class="quantity" min="0" name="quantity" style="width: 60px;" onchange value="`+ artículos[i].count +`" type="number"></td>
       
           <td id="costA`+ i +`" style="text-align: center;">`+artículos[i].unitCost+ " " + artículos[i].currency+`</td>
       
           <td id="totalparcial`+ i +`" style="text-align: center;">`+totalPP +" "+ artículos[i].currency+`</td>

           <td><button id="borrar`+ i +`" onclick="eliminarFila(`+i+`)" style="background-color:white;border-color: white;"><i style="font-size:24px" class="fa">&#xf1f8;</i></button></td> 

           </tr>`;
        
    };   
           document.getElementById("articlesWrapper").innerHTML += tBody;
    
};  


 function eliminarFila(id) {
    
   document.getElementById("Fila_"+id).remove();
  };

 

 function actualizarTP(id){
    let count = parseInt(document.getElementById("inputCountA"+id).value);
    monedaProd = document.getElementById("costA"+id).textContent;
    monedaProd2 = monedaProd.split(" ");
 
 
    var totalP = monedaProd2[0] * count;
 
   document.getElementById("totalparcial"+id).innerHTML = totalP +" "+ monedaProd2[1];
 
   actualizaTotal();
 
 };

 
 function actualizaTotal(){
    let subTotCostoHTML = document.getElementById("subTotal");
    let costoEnvioHTML = document.getElementById("costoEnvio");
    let costoTotHTML = document.getElementById("total");
    let cotizacion = document.getElementById("dolar")
  
    var sumaSubTotales = 0;
    

    for (i=0; i<mecart.length; i++){
      var textoTP = document.getElementById("totalparcial"+ i).textContent;
      var arText = textoTP.split(" ");
      var moneda = 1;
     if (arText[1] == "USD"){
        moneda = 40
      }
      var valorTexto = arText[0]*moneda;
      sumaSubTotales += parseInt(valorTexto);
    }
  
    let costoE = Math.round(porcentaje * sumaSubTotales);
  
    subTotCostoHTML.innerHTML = sumaSubTotales +" UYU";
    cotizacion.innerHTML = "El dólar se cotiza a $40";
    if (costoE != 0 ){
        costoEnvioHTML.innerHTML = costoE + " UYU"}else{
        costoEnvioHTML.innerHTML = "----"
    };
    costoTotHTML.innerHTML = (sumaSubTotales + costoE + " UYU");
};




function ValidaCredito(e) {
    var check1 = document.getElementById("customRadio1").checked;
    var numT = document.getElementById("validationCustom01").value ;
    var codT = document.getElementById("validationCustom02").value ;
    var vencT = document.getElementById("validationCustom03").value ;
   
    if (check1 && numT <13 || codT <3 || vencT == "" ){
    alert("completa los datos requeridos para esta forma de pago");
    e.preventDefault();
  };
};

function ValidaTransferencia(e) {    
  var check2 = document.getElementById("customRadio2").checked; 
  var numcuenta = document.getElementById("validationCustom04").value; 

    if ( check2 && numcuenta <13){
      alert("completa los datos requeridos para esta forma de pago");
      e.preventDefault();    
    };
    
};

  let confirmarPago =
    function (e){ 
      ValidaTransferencia(e);
      ValidaCredito(e);
    };

var Confirmar = document.getElementById("PagoOn"); 

Confirmar.addEventListener("click", confirmarPago);


document.getElementById("buy").addEventListener("click",buyOK);
function buyOK() {

        var street = document.getElementById("validationDefault03").value ;
        var number = document.getElementById("validationDefault05").value ;
        var esq = document.getElementById("validationDefault04").value ;
        var metodoPago = document.getElementById("select").value ;

    if (street.length >= 2 && number !== "" && esq.length >= 2 && metodoPago !== ""){
        return alert(mensajeCompra.msg);
    }
};
 
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(DESAF_AND_CART).then(function(resultObj){
        if (resultObj.status === "ok")
        {     datoscart = resultObj.data;
              mecart = datoscart.articles; 
                    showArt(mecart);

                    let mensajeDolar = document.getElementById("dolar")
                    TotalparcialI = 0;
                    SubInicial = 0;
                    monedaI = 1;
                    for(i=0; i<mecart.length; i++){
                      
                     TotalparcialI = document.getElementById("totalparcial"+ i).textContent.split(" ");
                     
                     if (TotalparcialI[1] == "USD"){
                       monedaI = 40
                      }

                      SubInicial += TotalparcialI[0]*monedaI;
                    
                      document.getElementById("subTotal").innerHTML = SubInicial;
                      document.getElementById("costoEnvio").innerHTML = SubInicial * porcentaje;
                      document.getElementById("total").innerHTML = (SubInicial * porcentaje) + SubInicial;
                      mensajeDolar.innerHTML="El dólar se cotiza a $40";
                    };  

        };
    });



  document.getElementById("prem").addEventListener("change",function(){
    porcentaje = 0.15;
    actualizaTotal();
  });
  document.getElementById("exp").addEventListener("change",function(){
    porcentaje= 0.07;
    actualizaTotal();
  });
  document.getElementById("std").addEventListener("change",function(){
    porcentaje = 0.05;
    actualizaTotal();
  });
  document.getElementById("tienda").addEventListener("change",function(){
    porcentaje = 0;
    actualizaTotal();
  });

  getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok")
             mensajeCompra = resultObj.data;      
        
    });
});


          
    
