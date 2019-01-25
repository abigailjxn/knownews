$("#getarticles").on("click", function(event){
    event.preventDefault();
   $.ajax({
       method: "GET",
       url: "/api/articles"
   })
   .then(function(dbArticle){
       console.log(dbArticle);
   })
});

$(".comment-btn").on("click", function(event){
    event.preventDefault();
    UIkit.modal("#comment-modal").show();
    const thisId = $(this).attr("id");
    console.log(thisId);

    $("#comment-confirm").on("click", function(event){
        const commentInfo = {
            name: $("#comment-name").val().trim(),
            body: $("#comment-body").val().trim()
        };
        console.log(commentInfo);
        $.ajax({
            type: "POST",
            url: "/api/articles/" + thisId,
            data: commentInfo
        })
        .then(function(data){
            console.log(data);
        });
    });
});

