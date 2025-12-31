function onSaveSettings() {
	let tmdbApiKey = document.getElementById("tmdb-api-key-input").value;
	const d = new Date();
	d.setTime(d.getTime() + (31 * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = "tmdbApiKey=" + tmdbApiKey + ";" + expires + ";path=/";
}

function init() {
	document.getElementById("save-settings-button").onclick = onSaveSettings;
}


window.onload = init;
