$("#pass").on("change", function(e){
    var passVal = $(this).val();
    if (passVal.length < 6){
        $(this).addClass("invalid").removeAttr("valid");
    } else {
        $(this).addClass("valid").removeAttr("invalid");
    }
});

$("#pass").on("focusout", function (e) {
    if ($(this).val() != $("#passwordConfirm").val()) {
        $("#passwordConfirm").removeClass("valid").addClass("invalid");
    } else {
        $("#passwordConfirm").removeClass("invalid").addClass("valid");
    }
});

$("#passwordConfirm").on("keyup", function (e) {
    if ($("#pass").val() != $(this).val()) {
        $(this).removeClass("valid").addClass("invalid");
    } else {
        $(this).removeClass("invalid").addClass("valid");
    }
});