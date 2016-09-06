$(function() {
	console.log("jQuery is working!")
	var $input = $("#input")
	var $searchBar = $("#search-bar")

	$input.focus(function() {
		console.log("Focus on input!");
		$searchBar.css("width", "60%");
	})

	$input.focusout(function() {
		console.log("Focus out of input!");
		$searchBar.css("width", "55%");
	})
});