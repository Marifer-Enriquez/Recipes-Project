var apiURL = "";
var search = "";
var termsNumber = 5;


$("#search-btn").on("click", function(event){
    event.preventDefault();
    console.log("entra al click");
    search=$("#search-term").val();
    console.log(termsNumber);

    apiURL="https://api.nytimes.com/svc/search/v2/articlesearch.json?fq="+search+"?sort=newest&api-key=be08fdca00144ba4ad5a1b84c731fcfd";

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(result) {
        // console.log(result);

        for(var i=0;i<termsNumber;i++){
        var title=result.response.docs[i].headline.main;
        var articleURL=result.response.docs[i].web_url;
        var link=$("<a>");
        link.attr("href", articleURL);
        link.append(title);
        $("#howtotest").append(link);
        $("#howtotest").append("<br>");
        }
    });
});

