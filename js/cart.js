//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

        mecart = resultObj.data;
           

                let nameysrcA  = document.getElementById("Art");
                let countArt = document.getElementById("countA");
                let costoA = document.getElementById("costA");
            
                nameysrcA.innerHTML = `<img src="`+mecart.articles[0].src+`" class="img-thumbnail" width="22%">`+ mecart.articles[0].name;
                countArt.innerHTML = mecart.articles[0].count;
                costoA.innerHTML = mecart.articles[0].unitCost+ " " + mecart.articles[0].currency;
           
                let totalP = document.getElementById("totalparcial");
                totalP.innerHTML = (mecart.articles[0].count * mecart.articles[0].unitCost);
                
                let subTot= document.getElementById("subTotal");
                var suma = "";
                
                for(i=0; i<mecart.articles.lenght; i++){
                    let numero = mecart.articles[i].count * mecart.articles[i].unitCost
                    suma += numero        
                    
                    subTot.innerHTML = suma
                };

                
        };
            
     });

    

});