function onSaveSettings() {
	let tmdbApiKey = document.getElementById("tmdb-api-key-input").value;
	const d = new Date();
	d.setTime(d.getTime() + (31 * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = "tmdbApiKey=" + tmdbApiKey + ";" + expires + ";path=/";

	const template = document.querySelector("#save-settings-result-template");
	const clone = document.importNode(template.content, true);
	let label = clone.querySelector("label");
	label.innerText = "Success!";

	let settings = document.querySelector("#settings");
	settings.appendChild(clone);
}

function init() {
	document.getElementById("save-settings-button").onclick = onSaveSettings;

	let tmdbApiKey = getCookie("tmdbApiKey");
	if (tmdbApiKey != "" && tmdbApiKey != null) {
		document.getElementById("tmdb-api-key-input").value = "*".repeat(tmdbApiKey.length);
	}
}


window.onload = init;
