$(document).ready(function() {
​
    //Compile templates on DOM load
    var wineTemplateSource = $("#wine-template").html();
    var wineTemplate = Handlebars.compile(wineTemplateSource);
​
    var BASE_URL = "https://myapi.profstream.com/api/3def27/wines";
​
    $.ajax({
        type: "GET",
        url: BASE_URL,
        success: function(wines) {
            var $wineContainer = $("#wine-container");
​
            $wineContainer.html("");
​
            wines.forEach(function(wine) {
                var newWineHTML = wineTemplate(wine);
​
                $wineContainer.append(newWineHTML);
            });
        },
        error: function() {
            alert("Cannot get wine data");
        }
    });
​
    $("#new-wine-form").on("submit", function(event) {
        event.preventDefault();
​
        var wineData = {
            name: $("#name").val(),
            grapes: $("#grapes").val(),
            year: $("#year").val(),
            country: $("#country").val(),
            region: $("#region").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            picture: $("#picture").val()
        };
​
        $.ajax({
            type: "POST",
            url: BASE_URL,
            data: wineData,
            success: function() {
                $("#wine-container").append(wineTemplate(wineData));
​
                $("#add-wine-modal").modal("hide");
​
                $("#new-wine-form")[0].reset();
            },
            error: function() {
                alert("Error saving wine");
            }
        });
    });
​
});































});
