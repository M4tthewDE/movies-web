async function search(searchString) {
	const searchResults = document.querySelector("#search-results");

	let url = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=" + searchString;
	let tmdbApiKey = getCookie("tmdbApiKey");
	
	if (tmdbApiKey == "") {
		const template = document.querySelector("#search-result-error-template");
		const clone = document.importNode(template.content, true);
		let label = clone.querySelector("label");
		label.innerText = "TMDB api key is not set!";
		searchResults.appendChild(clone);
		return;
	}

	let resp = await fetch(url, {
		headers: {
			"Authorization": "Bearer " + tmdbApiKey,
			"Content-Type": "application/json"
		}
	}).then((response) => {
		return response.json();
	});

	const template = document.querySelector("#search-result-template");

	resp.results.forEach(element => {
		const clone = document.importNode(template.content, true);
		let img = clone.querySelector("img");
		if (element.poster_path) {
			img.setAttribute("src", "https://image.tmdb.org/t/p/w600_and_h900_face/" + element.poster_path);
		} else {
			img.setAttribute("src", "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg");
		}
		let label = clone.querySelector("label");
		label.innerText = element.original_title;
		searchResults.appendChild(clone);
	});
}

function init() {
	let params = new URLSearchParams(document.location.search);
	let searchString = params.get("search");
	if (searchString != "" && searchString != null) {
		search(searchString);
	}
}


window.onload = init;
