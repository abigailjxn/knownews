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

    $(".comment-form").on("submit", function(event){
        event.preventDefault();
        const commentInfo = {
            name: $("#comment-name").val().trim(),
            body: $("#comment-body").val().trim()
        };
        // console.log(commentInfo);
        // console.log(thisId);

        $.ajax({
            method: "POST",
            url: "/api/articles/" + thisId,
            data: commentInfo
        })
        .then(function(data){
            console.log(data);
            $("#comment-confirm").on("click", function(event){
                event.preventDefault();
                UIkit.modal("#comment-modal").hide();
                $.ajax({
                    method: "GET",
                    url: "/api/articles" + thisId
                })
                .then(function(dbArticle){
                    console.log(dbArticle);
                })
            })
        });
    });
});


// $("#comment-confirm").on("click", function(event){
//     event.preventDefault();
//     UIkit.modal("#comment-modal").hide();
//     $.ajax({
//         method: "GET",
//         url: "/api/articles" + thisId
//     })
//     .then(function(dbArticle){
//         console.log(dbArticle);
//     })
// })

