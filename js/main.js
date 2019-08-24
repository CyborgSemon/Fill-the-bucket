console.log("JS has loaded");
console.dir($("#bucketList"));

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
      $("#yearBorn").html(
        "People born in Aotearoa in " + year + " have since died."
      );
      let deathsNumber = $("#deathsNumber");
      deathsNumber.html(data.total);
    }
  });
});

$("#secondBtn").click(function() {
  event.preventDefault();
  $("#page2").hide();
  $("#page3").show();
});

$("#addItem").click(function() {
  let addItemInput = $("#addItemInput").val();
  $("#bucketList").append("<li>" + addItemInput + "</li>");
});
