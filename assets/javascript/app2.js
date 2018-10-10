var queryURLbase = "https://api.edamam.com/search?&app_id=90f8bc57&app_key=45392a4a053ae6f964207a3bb4b0d7a5&from=0&to=9&q=";

var userInput;
var from = 0;
var to = 9;

var imgAPI;
var label;
var recipe;
var sourceLink;
var queryURLbase5;

var apiURL = "";
var search = "";
var termsNumber = 5;


//Add the ingredient to the BOX
$("#add-ingredient").on("click", function (event) {
    event.preventDefault();
    var ingredient = $("#search-term").val().trim();
    if (ingredient == "") {
        return false;
    }
    newP = $("<p>");
    newP.addClass("newingredient");
    newP.text(ingredient + " ");

    $("#search-term").empty();

    $("#losingredientes").prepend(newP);

});

//If you click the ingredients hide all

$("p").on("click", function (event) {

    $(".newingredient").hide();
});


function testAjax(queryURL) {
    fetch(queryURL)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            console.log(queryURLbase)
            for (var i = 0; i < 9; i++) {

                //create recipe card.
                var card = $("<div>");
                card.addClass("card col s12 m6 l4");
                var cardImg = $("<div>");
                cardImg.addClass("card-image recipe-image");

                var img = $("<img>");
                imgAPI = data.hits[i].recipe.image; //<------Here we looking for the image
                img.attr("src", imgAPI);
                cardImg.append(img);
                card.append(cardImg); //<-------We add the image to card

                var cardContent = $("<div>");
                cardContent.addClass("card-content");

                //Variable for the recipe title/label.
                var spanTitle = $("<span>");
                spanTitle.addClass("card-title");
                label = data.hits[i].recipe.label;
                spanTitle.text(label);
                //This appends the recipe title/label to the recipe image.
                cardImg.append(spanTitle);

                var pRecipe = $("<p>");
                for (var j = 0; j < 20; j++) { //<----For display the Ingredients
                    var recipeUgly = data.hits[i].recipe.ingredientLines[j];
                    var newIng = $("<p>");
                    newIng.text(recipeUgly)
                    pRecipe.append(newIng);
                };
                cardImg.after(cardContent);

                img.addClass("activator");

                activateIngredients = $("<span>");
                activateIngredients.addClass("card-title activator").text("Ingredients");
                revealIngredientsIcon = $("<i>");
                revealIngredientsIcon.addClass("material-icons right tooltipped").text("more_vert").attr("data-position", "top").attr("data-tooltip", "Click to view ingredients.");

                $('.tooltipped').tooltip({
                    delay: 30
                });
                activateIngredients.append(revealIngredientsIcon);


                cardContent.append(activateIngredients);

                var cardReveal = $("<div>");
                cardReveal.addClass("card-reveal");

                var cardRevealTitle = $("<span>");
                cardRevealTitle.addClass("card-title").text("Ingredients");

                var closeRevealIcon = $("<i>");
                closeRevealIcon.addClass("material-icons right").text("close");
                cardRevealTitle.append(closeRevealIcon);

                cardReveal.append(cardRevealTitle);

                card.append(cardReveal);

                cardReveal.append(pRecipe);


                var cardAction = $("<div>");
                cardAction.addClass("card-action");

                var link = $("<a>");
                link.text("More info");
                sourceLink = data.hits[i].recipe.url;
                link.attr("href", sourceLink);
                link.attr("target", "_blank");

                var saveBtn = $("<i>");
                saveBtn.addClass("small fa fa-cutlery tooltipped");

                saveBtn.attr("data-name", [i]).attr("data-position", "top").attr("data-tooltip", "Click to save recipe to Recipe box.");

                $('.tooltipped').tooltip({
                    delay: 30
                });

                cardAction.append(link, saveBtn);
                cardContent.after(cardAction);
                $("#recipe-list").append(card);


            };
        });
};


$("#run-search").on("click", function (e) {

    // Prevent form from submitting
    e.preventDefault();

    // $("#search-term")
    //Grab the user input from the main word search text box.
    userInput = $("#search-term").val().trim().toLowerCase();

    // Integrate user input into our ajax request
    var searchURL = queryURLbase + userInput;
    search = $("#search-term").val();
    testAjax(searchURL);

    // Clear previous search
    $("#recipe-list").empty();



    $("#search-term").val("");

    // Reset the display of the load more button to its initial state
    $("#load-more").css("display", "initial");


    apiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + search + "?sort=newest&api-key=be08fdca00144ba4ad5a1b84c731fcfd";


    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (result) {
        // console.log(result);

        for (var i = 0; i < termsNumber; i++) {
            var title = result.response.docs[i].headline.main;
            var articleURL = result.response.docs[i].web_url;
            var link = $("<a>");
            link.attr("href", articleURL);
            link.append(title);
            $("#howtotest").append(link);
            $("#howtotest").append("<br>");


        }
    });




});

//Here the bottom for 


$("#load-more").on("click", function (e) {

    // Prevent form from submitting
    e.preventDefault();

    //Grab the user input from the main word search text box.
    from += 10;
    to += 10;

    // URL restatement
    var queryURLbase2 = "https://api.edamam.com/search?&app_id=4a5d81a2&app_key=379308ab9da9a8ee47f63563d2774ac4&q="
    var queryURLbase3 = queryURLbase2 + userInput;
    var queryURLbase4 = queryURLbase3 + "&from=" + from;
    queryURLbase5 = queryURLbase4 + "&to=" + to;
    testAjax(queryURLbase5);
});







/*
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
  */