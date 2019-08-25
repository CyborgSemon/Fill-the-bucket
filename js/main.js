let newIcon;

$('#closeCat').click(()=> {
	$('#overlay').hide();
	$('#overlayBg').hide();
});

$('#addItem').click(()=> {
	let newText = $('#itemText').val();
	$('#toDo').append(`<div class="listItem"><div class="listBtn"><i class="material-icons">${newIcon}</i>${newText}</div><div class="options"><div class="complete">Complete</div><div class="edit">Edit</div><div class="delete">Delete</div></div></div>`);
	addevents($('#toDo').children()[$('#toDo').children().length - 1].childNodes[0]);
	$('#inputArea').hide();
	$('#catListBtns').show();
	$('#overlay').hide();
	$('#overlayBg').hide();
	$('#itemText').val(null);
});

$('#closeCatInput').click(()=> {
	$('#inputArea').hide();
	$('#catListBtns').show();
	$('#itemText').val(null);
});

$('#overlayBg').click(()=> {
	$('#overlay').hide();
	$('#overlayBg').hide();
});

$("#subBtn").click(function () {
	event.preventDefault();

	let year = parseInt($("#year").val());

	if (year >= 1948 && year <= 2018) {
		$.ajax({
			url: `http://localhost:3000/death/year=${year}`,
			type: "GET",
			dataType: "json",
			error: err => {
				console.log(err);
			},
			success: data => {
				$("#page1").hide();
				$("#page2").show();
				let deathsNumber = $("#deathsNumber");
				deathsNumber.html(data.total);
				$("#finalYear").html(year);
				$('#invalidYear').hide();
			}
		});
	} else {
		$('#invalidYear').show();
	}
});

$('#secondBackBtn').click(()=> {
	$("#page2").hide();
	$("#page1").show();
});

$("#secondBtn").click(function () {
	event.preventDefault();
	$("#page2").hide();
	$("#page3").show();

	$('#fab').click(() => {
		document.getElementById('overlay').style.display = 'block';
		$('#overlayBg').show();
	});

	[].forEach.call(document.querySelectorAll('.category'), (e)=> {
		e.addEventListener('click', ()=> {
			let title = e.childNodes[1].dataset.cattype;
			newIcon = e.childNodes[1].dataset.icon;
			$('#titleLabel').text(title);
			$('#catListBtns').hide();
			$('#inputArea').show();
		});
	});

	let tab = $(".highlight");
	tab.find(".tab").on("click", function () {
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

		[].forEach.call(document.querySelectorAll('.listItem'), (ele) => {
			ele.classList.remove('active');
		});

		tab.removeClass("left right").addClass(direction);
		tab.find(".tab.active").removeClass("active");
		$this.addClass("active");
	});


	[].forEach.call(document.querySelectorAll('.listBtn'), (e) => {
		addevents(e);
	});
});

function deleteItem(elementThing) {
	$(elementThing.parentNode).css({
		maxHeight: '0px',
		marginBottom: '0px'
	});
	setTimeout(() => {
		$(elementThing.parentNode).remove();
	}, 400);
}

function addevents(newElement) {
	newElement.addEventListener('click', () => {
		if (newElement.parentNode.className.includes('active')) {
			newElement.parentNode.classList.remove('active');
		} else {
			[].forEach.call(document.querySelectorAll('.listItem'), (ele) => {
				ele.classList.remove('active');
			});
			newElement.parentNode.classList.add('active');
		}
	});
	try {
		newElement.parentNode.childNodes[3].childNodes[1].addEventListener('click', () => {
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
		newElement.parentNode.childNodes[3].childNodes[5].addEventListener('click', () => {
			deleteItem(newElement);
		});
	} catch (err) {
		newElement.parentNode.childNodes[1].childNodes[0].addEventListener('click', () => {
			$(newElement.parentNode).removeClass('active');
			let element = $(newElement.parentNode).clone();
			if (newElement.parentNode.childNodes[1].childNodes[0].innerText == 'Undo') {
				$('#toDo').append(element);
				$('#toDo').children()[$('#toDo').children().length - 1].childNodes[1].childNodes[0].innerText = 'Complete';
				deleteItem(newElement);
				addevents($('#toDo').children()[$('#toDo').children().length - 1].childNodes[0]);
			} else {
				$('#complete').append(element);
				$('#complete').children()[$('#complete').children().length - 1].childNodes[1].childNodes[0].innerText = 'Undo';
				deleteItem(newElement);
				addevents($('#complete').children()[$('#complete').children().length - 1].childNodes[0]);
			}
		});
		newElement.parentNode.childNodes[1].childNodes[2].addEventListener('click', () => {
			deleteItem(newElement);
		});
	}

	// newElement.parentNode.childNodes[3].childNodes[3].addEventListener('click', ()=> {
	// 	// Edit text
	// });

}
