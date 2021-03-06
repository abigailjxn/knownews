$("#getarticles").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/api/articles"
    })
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
});

$("#scrape").on("click", function (event) {
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
});

$(".comment-btn").on("click", function (event) {
    event.preventDefault();
    UIkit.modal("#comment-modal").show();
    const thisId = $(this).attr("id");

    $(".comment-form").on("submit", function (event) {
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
            .then(function (data) {
                console.log(data);

            });
    });
});


$(".comment-link").on("click", function (event) {
    event.preventDefault();
    let thisId = $(this).data("id");
    $.ajax({
        method: "GET",
        url: "/api/articles/" + thisId
    })
        .then(function (dbArticle) {
            console.log(dbArticle);
            const nameText = $("<li>").text(`Name: ${dbArticle.comment.name}`);
            const bodyText = $("<li>").text(`Comment: ${dbArticle.comment.body}`);
            $("ul").find(`[data-commentid='${thisId}']`).append(nameText).append(bodyText);
            // $(".comment-list").append(commentList);
            // dbArticle.forEach(function (comment) {
            //     const nameText = $("<li>").text(comment.name);
            //     const bodyText = $("<li>").text(comment.body);
            //     $(".comment-list").append(nameText).append(bodyText);
            // })
        })
})

