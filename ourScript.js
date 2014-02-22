$(document).ready(function() {
  function loadTransportData() {
    console.log(3);
  }

  $(".outer_row").click( function() {
    if ($(this).hasClass("focus"))
      return;
    $("div.outer_row.focus").css("background-color", "").removeClass("focus");
    $(this).addClass("focus");
  });
});
