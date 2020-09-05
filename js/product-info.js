var category = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;

    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("soldCount");
            let productCriteriaHTML = document.getElementById("productCriteria");
            let costHTML = document.getElementById( "cost");
            
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;
            productCriteriaHTML.innerHTML = category.category;
            costHTML.innerHTML = category.cost + " " + category.currency;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);

            var relacionP = category.relatedProducts ;

         getJSONData(PRODUCTS_URL).then(function(resultObj){
               if (resultObj.status === "ok") {
                 let products = resultObj.data;

                  html=``;
 
                    var relatedtemp;
                    for ( i=0; i < relacionP.length ; i++){
                        var rel=relacionP[i];
                        relatedtemp= products[rel];

                        html +=`
                        <div class="col-lg-3 col-md-4 col-6" style="width: 18rem;">
                                <img src="${relatedtemp.imgSrc}" class="img-fluid img-thumbnail" alt="...">
                          <div class="card-body">
                                <h5 class="card-title">${relatedtemp.name}</h5>
                                <p class="card-text">${relatedtemp.description}</p>
                                <a href=" " class="btn btn-link">Ver</a>
                           </div>
                         </div>
                        `
                    
                     document.getElementById("relacionados").innerHTML = html
                    }
                }
            });
        }
    });
     
});