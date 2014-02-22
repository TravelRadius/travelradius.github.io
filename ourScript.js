var first_click = false;

$(document).ready(function() {
  function loadTransportData() {
    console.log(3);
  }

  $(".outer_row").click( function() {
    if ($(this).hasClass("focus"))
      return;
    /*$("div.outer_row.focus").css("background-color", "").animate({"padding-left":"-=40px"})
    $("div.outer_row.focus").fadeTo("fast", 1).removeClass("focus");

    $(this).addClass("focus");
    $(this).animate({"padding-left":"+=40px"});
    $("div.outer_row").not(".focus").fadeTo("fast", .3);*/

    $(this).addClass("dummy");
    $(".outer_row").each(function() {
      if (first_click && $(this).hasClass("focus")) {
        $(this).css("background-color", "")
        $(this).animate({"padding-left":"-=40px", "opacity":".5"})
        $(this).removeClass("focus");
      }
      else if (!first_click && !$(this).hasClass("dummy")) {
        $(this).animate({"opacity":".5"})
      }
    });

    first_click = true;
    $(this).removeClass("dummy");
    $(this).addClass("focus");
    $(this).animate({"padding-left":"+=40px", "opacity":"1"});
    //$(this).fadeTo("fast", 1)
  });
});
