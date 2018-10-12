//var queryURLbase = "https://api.edamam.com/search?&app_id=90f8bc57&app_key=45392a4a053ae6f964207a3bb4b0d7a5&from=0&to=9&q=";

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

var ingredients = [];

//Add the ingredient to the BOX
$("#add-ingredient").on("click", function (event) {
    event.preventDefault();
    var newIng = $("#search-term").val().trim();
    ingredients.push(newIng);
    if (newIng == "") {
        return false;
    }
    newP = $("<p>");
    newP.addClass("newingredient");
    newP.attr('data-name',newIng);
    newP.text(newIng + " ");

    $("#search-term").empty();

    $("#losingredientes").prepend(newP);

});

//If you click the ingredients hide all

$(document).on("click",'.newingredient', function () {
    var name = $(this).attr('data-name');
    var i = ingredients.indexOf(name);
    ingredients.splice(i,1);
    $(this).detach();
    
    
});


function testAjax(queryURL) {
    fetch(queryURL)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            
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
    var search = ingredients.toString().replace(/,/g,'+');
    var numOfIngredients = ingredients.length;
    var appId = '0722400';
    var appKey = '38642907c009a258fa149a594cca043d';
    var queryURL = `https://api.edamam.com/search?q=${search}&ingr=${numOfIngredients+1}&app_id=${appId}e&app_key=${appKey}`;

    // Integrate user input into our ajax request
    console.log(queryURL);
    
    testAjax(queryURL);

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
    var search = ingredients.toString().replace(/,/g,'+');
    var numOfIngredients = ingredients.length;
    var appId = '0722400';
    var appKey = '38642907c009a258fa149a594cca043d';
    var queryURL = `https://api.edamam.com/search?q=${search}&ingr=${numOfIngredients+1}&app_id=${appId}e&app_key=${appKey}&from=${from}&to=${to}`;

    // URL restatement
    
    testAjax(queryURL);
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