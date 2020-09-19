var category = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";
    var activar;
    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];
        if (i == 0) activar = " active";
        else activar = "";
        
        htmlContentToAppend += `
        <div class="carousel-item`+ activar +`">
      <img src="`+ imageSrc +`" class="d-block w-100" alt="">
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

    
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
             let comments = resultObj.data;
            
             let htmlC=" ";

             for (let i=0 ; i < comments.length ; i++){
                comment= comments[i];
                
                    let scoreF =" ";
                    for (let j=0; j < comment.score; j++){
                       scoreF += '<span class="fa fa-star checked"></span>'
                    };
                    for (j=comment.score; j<5 ; j++){
                         scoreF += '<span class="fa fa-star "></span>'
                    };

                htmlC +=`
                <div style="background-color:hsla(120,0%,50%,0.05 );">
                <hr style="margin: 15px;">
                <small class="card-title"><strong>${comment.user}</strong></small>
                <small> - ${comment.dateTime}</small>          
                <span> - ${scoreF}</span>
                <br>
                <small class="card-text">${comment.description}</small>
                </div>
                    `
                document.getElementById("comments").innerHTML = htmlC;
            };         
        };
    });

 document.getElementById("submit").addEventListener("click",function(){
        var newcomments = document.getElementById("newcomment").value;
        var calificacion = document.getElementById("calificacion").value;
        var dateNewComment = new Date().toLocaleString();
        var userS=sessionStorage.getItem('userName');
        var userSession= userS.split("@",1);


        var commentObject = {
            comment: newcomments,
            score:calificacion,
            dateTime: dateNewComment,
            user: userSession 
        };
        
        var commentCad =JSON.stringify(commentObject);
        
       localStorage.setItem("Comentarios", commentCad);
    
    });  

     var commentLocal = localStorage.getItem("Comentarios");
     var comentarioNuevo = JSON.parse(commentLocal);
    
        let scoreNuevo =" ";
        for (let j=0; j < comentarioNuevo.score; j++){
             scoreNuevo+= '<span class="fa fa-star checked"></span>'
        };
        for (j=comentarioNuevo.score; j<5 ; j++){
             scoreNuevo+= '<span class="fa fa-star "></span>'
        };
      
        let comentarioN="";
        comentarioN +=`
        <div style="background-color:hsla(120,0%,50%,0.05 );">
        <hr style="margin: 15px;">
        <small class="card-title"><strong>${comentarioNuevo.user}</strong></small>
        <small> - ${comentarioNuevo.dateTime}</small>          
        <span> - ${scoreNuevo}</span>
        <br>
        <small class="card-text">${comentarioNuevo.comment}</small>
        </div>
                        `
     
        document.getElementById("ComentarioNuevo").innerHTML =comentarioN;
               
});


