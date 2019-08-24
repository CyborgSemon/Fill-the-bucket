console.log("JS has loaded");

$("#subBtn").click(function() {
  event.preventDefault();

  let year = $("#year").val();
  $.ajax({
    url: `http://localhost:3000/death/year=${year}`,
    type: "GET",
    dataType: "json",
    error: err => {
      console.log(err);
    },
    success: data => {
      console.log(data);
      $("#page1").hide();
      $("#page2").show();
      let deathsNumber = $("#deathsNumber");
      deathsNumber.html(data.total);
      $("#finalYear").html(year);
    }
  });
});

$("#secondBtn").click(function() {
  event.preventDefault();
  $("#page2").hide();
  $("#page3").show();
});
