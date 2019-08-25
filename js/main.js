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
	let tab = $(".highlight");
	tab.find(".tab").on("click", function() {
		let $this = $(this);

		if ($this.hasClass("active")) return;

		let direction = $this.attr("tab-direction");

		if (direction == 'left') {
			$('#complete').hide();
			$('#toDo').show();
		} else {
			$('#toDo').hide();
			$('#complete').show();
		}

		[].forEach.call(document.querySelectorAll('.listItem'), (ele)=> {
			ele.classList.remove('active');
		});

		tab.removeClass("left right").addClass(direction);
		tab.find(".tab.active").removeClass("active");
		$this.addClass("active");
	});


	[].forEach.call(document.querySelectorAll('.listBtn'), (e)=> {
		addevents(e);
	});

	function addevents (newElement) {
		newElement.addEventListener('click', ()=> {
			if (newElement.parentNode.className.includes('active')) {
				newElement.parentNode.classList.remove('active');
			} else {
				[].forEach.call(document.querySelectorAll('.listItem'), (ele)=> {
					ele.classList.remove('active');
				});
				newElement.parentNode.classList.add('active');
			}
		});
		newElement.parentNode.childNodes[3].childNodes[1].addEventListener('click', ()=> {
			$(newElement.parentNode).removeClass('active');
			let element = $(newElement.parentNode).clone();
			if (newElement.parentNode.childNodes[3].childNodes[1].innerText == 'Undo') {
				$('#toDo').append(element);
				$('#toDo').children()[$('#toDo').children().length - 1].childNodes[3].childNodes[1].innerText = 'Complete';
				deleteItem(newElement);
				addevents($('#toDo').children()[$('#toDo').children().length - 1].childNodes[1]);
			} else {
				$('#complete').append(element);
				$('#complete').children()[$('#complete').children().length - 1].childNodes[3].childNodes[1].innerText = 'Undo';
				deleteItem(newElement);
				addevents($('#complete').children()[$('#complete').children().length - 1].childNodes[1]);
			}
		});
		// newElement.parentNode.childNodes[3].childNodes[3].addEventListener('click', ()=> {
		// 	// Edit text
		// });
		newElement.parentNode.childNodes[3].childNodes[5].addEventListener('click', ()=> {
			deleteItem(newElement);
		});
	}

	function deleteItem (elementThing) {
		$(elementThing.parentNode).css({
			maxHeight: '0px',
			marginBottom: '0px'
		});
		setTimeout(()=> {
			$(elementThing.parentNode).remove();
		}, 400);
	}

	function addItem () {

	}
});
