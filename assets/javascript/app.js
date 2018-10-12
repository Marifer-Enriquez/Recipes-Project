var ingredients = ['eggs', 'bacon', 'cheese'];
var numOfIngredients = ingredients.length;
console.log(numOfIngredients);

$(document).ready(function () {
  
    var search = ingredients.toString().replace(/,/g,'+');
    var appId = '0722400';
    var appKey = '38642907c009a258fa149a594cca043d';
    console.log(search);
    
    //$(XXX).text().toLowerCase().replace(/ /g, '+');
    var queryURL = `https://api.edamam.com/search?q=${search}&ingr=${numOfIngredients}&app_id=${appId}e&app_key=${appKey}`;


    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        let results = response.hits;
        console.log(results[0].label);
        
        

    })


})