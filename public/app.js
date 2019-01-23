$("#getarticles").on("click", function(event){
    event.preventDefault();
   $.ajax({
       method: "GET",
       url: "/api/articles"
   })
   .then(function(dbArticle){
       console.log(dbArticle);
   })
})