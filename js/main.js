console.log("JS has loaded");

$("#subBtn").click(function() {
  event.preventDefault();
  let year = $("#year").val();
  $.ajax({
    url: `http://localhost:3000/death/year=${year}`,
    type: "GET",
    dataType: "jsonp",
    error: err => {
      console.log(err);
    },
    success: data => {
      console.log(data);
    }
  });
});
