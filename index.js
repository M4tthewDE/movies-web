function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function onSearch() {
	let searchString = document.getElementById("search-input").value;
	search(searchString);
}

async function search(searchString) {
	let url = "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=" + searchString;
	let resp = await fetch(url, {
		headers: {
			"Authorization": "Bearer " + getCookie("tmdbApiKey"),
			"Content-Type": "application/json"
		}
	}).then((response) => {
		return response.json();
	});

	const searchResults = document.querySelector("#search-results");
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
	if (searchString != "") {
		search(searchString);
	}
}


window.onload = init;
