$(function() {
	console.log("jQuery is working!")
	var $btn = $(".btn");
	var $input = $("#input")
	var $searchBar = $("#search-bar")

	$btn.click(function() {
		$(this).addClass("anim");
		setTimeout(() => {$(this).removeClass("anim") }, 750);
	})

	$input.focus(function() {
		console.log("Focus on input!");
		$searchBar.css("width", "60%");
	})

	$input.focusout(function() {
		console.log("Focus out of input!");
		$searchBar.css("width", "55%");
	})
});