//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function myPago() {
    var option_value = document.getElementById("select").value;
    if (option_value == "1") {
     $("#myModal").modal();
     }
};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

         mecart = resultObj.data;
           

                let nameysrcA  = document.getElementById("Art");
                let countArt = document.getElementById("countA");
                let costoA = document.getElementById("costA");
            
                nameysrcA.innerHTML = `<img src="`+mecart.articles[0].src+`" class="img-thumbnail" width="22%">`+ mecart.articles[0].name;
                countArt.innerHTML = `<input id="inputCountA" class="quantity" min="0" name="quantity" style="width: 60px;" onchange value="`+ mecart.articles[0].count +`" type="number">`;
                costoA.innerHTML = mecart.articles[0].unitCost+ " " + mecart.articles[0].currency;
           
                let totalP = document.getElementById("totalparcial");
                let totalPP = mecart.articles[0].count * mecart.articles[0].unitCost;
                totalP.innerHTML = totalPP + " " + mecart.articles[0].currency;
                
                let subTot= document.getElementById("subTotal")
                subTot.innerHTML = totalPP + " " + mecart.articles[0].currency;

                let totalF= document.getElementById("total");
                totalF.innerHTML = totalPP + " " + mecart.articles[0].currency;

                
                var countArtNew = 0;

            document.getElementById("inputCountA").addEventListener("change",function(){

             let varCountA =document.getElementById("inputCountA").value;
            countArtNew = varCountA * mecart.articles[0].unitCost;
            
             totalP.innerHTML = countArtNew + " " + mecart.articles[0].currency;
             subTot.innerHTML = countArtNew + " " + mecart.articles[0].currency;
             totalF.innerHTML= countArtNew + " "+ mecart.articles[0].currency;

            
            });

            document.getElementById("tienda").addEventListener("change",function(){
             
                if (countArtNew != 0){
                    document.getElementById("costoEnvio").innerHTML = "---";
                    document.getElementById("total").innerHTML = countArtNew + " " + mecart.articles[0].currency;
                  }else{
                    document.getElementById("costoEnvio").innerHTML = "---";
                    document.getElementById("total").innerHTML = totalPP + " " + mecart.articles[0].currency;
                }
                
              });

             document.getElementById("prem").addEventListener("change",function(){
             
                let porcentajeP = 0.15;
                if (countArtNew != 0){
                    document.getElementById("costoEnvio").innerHTML = countArtNew*porcentajeP +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = countArtNew*porcentajeP + countArtNew + " " + mecart.articles[0].currency;
                 
                  }else{
                    document.getElementById("costoEnvio").innerHTML = totalPP*porcentajeP +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = totalPP*porcentajeP + totalPP + " " + mecart.articles[0].currency;
                }

              });
             
            document.getElementById("exp").addEventListener("change",function(){
             
                let porcentajeE = 0.07;
                if (countArtNew != 0){
                    document.getElementById("costoEnvio").innerHTML = Math.round(countArtNew*porcentajeE) +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = Math.round(countArtNew*porcentajeE) + countArtNew + " " + mecart.articles[0].currency;
                  }else{
                    document.getElementById( "costoEnvio").innerHTML = Math.round(totalPP*porcentajeE) +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = Math.round(totalPP*porcentajeE) + totalPP + " " + mecart.articles[0].currency;
                }
            });    

            document.getElementById("std").addEventListener("change",function(){
             
                let porcentajeS = 0.05;
                if (countArtNew != 0){
                    document.getElementById("costoEnvio").innerHTML =  countArtNew*porcentajeS +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = countArtNew*porcentajeS + countArtNew + " " + mecart.articles[0].currency;
                  }else{
                    document.getElementById("costoEnvio").innerHTML = totalPP*porcentajeS +" "+ mecart.articles[0].currency;
                    document.getElementById("total").innerHTML = totalPP*porcentajeS + totalPP + " " + mecart.articles[0].currency;
                }

            });
        
        }    
    });
     

});