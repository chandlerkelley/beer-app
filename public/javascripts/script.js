$(function() {
	console.log("jQuery is working!")
	var $btn = $(".btn");
	var $input = $("#input")
	var $searchBar = $("#search-bar")

	$btn.click(function() {
		$(this).toggleClass("anim");
	})

	$input.focus(function() {
		console.log("Focus on input!");
		$searchBar.css("width", "70%");
	})

	$input.focusout(function() {
		console.log("Focus out of input!");
		$searchBar.css("width", "60%");
	})
});