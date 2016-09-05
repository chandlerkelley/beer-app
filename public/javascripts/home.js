angular.module("whatsOnTap")
.component("home", {
	template: `
	<main>
		<div class="search-container">
			<h2 class="search-title">search by beer or bar</h2>
			<div id="search-bar">
				<i id= "search-icon" class="material-icons">search</i>
				<input id="input">
			</div>
		</div>
		<div class="new-bar-button btn">
			<h3>Sign in to add new bar page</h3>
		</div>
		<div class="button-container">
			<div ng-repeat="bar in $ctrl.bars | limitTo:6:0" class="main-button btn"> 
				<!-- Make the "1" in the limitTo above a value that comes from the page number -->
				<i class="material-icons">store_mall_directory</i>
				<div class="button-content">
					<h3>{{bar.name}}</h3>
					<p>{{bar.neighborhood}}</p>
				</div>
				<i class="material-icons">navigate_next</i>
			</div>
			
		</div>
	</main>
	`,
	controller: function () {
		this.hello = "Hello";
		this.bars = [
						{ name: "Bar 1", neighborhood: "This neighborhood" },
						{ name: "Bar 2", neighborhood: "This neighborhood" },
						{ name: "Bar 3", neighborhood: "This neighborhood" },
						{ name: "Bar 4", neighborhood: "This neighborhood" },
						{ name: "Bar 5", neighborhood: "This neighborhood" },
						{ name: "Bar 6", neighborhood: "This neighborhood" },
						{ name: "Bar 7", neighborhood: "This neighborhood" },
						{ name: "Bar 8", neighborhood: "This neighborhood" },
						{ name: "Bar 9", neighborhood: "This neighborhood" },
						{ name: "Bar 10", neighborhood: "This neighborhood" },
						{ name: "Bar 11", neighborhood: "This neighborhood" },
						{ name: "Bar 12", neighborhood: "This neighborhood" },
					]
	}
})