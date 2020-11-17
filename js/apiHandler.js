// Event handler untuk element yang ditambahkan kemudian
const elementHandler = (selector, event, handler) => {
	document.querySelector('body').addEventListener(event, (evt) => {
		if (evt.target.matches(selector)) handler(evt);
	});
}

// Fetch Status
const statusRespons = (response) => {
	return response.status !== 200 ? Promise.reject(new Error(response.statusText)) : Promise.resolve(response);
}

// Promise json
const dataJson = (val) => {
	return val.json();
}

const component = {
	'baseUrl':'https://api.football-data.org/v2/',
	'loaderAnimation':`<div class="row"><div class="col s12 center"><div class="preloader-wrapper big active"><div class="spinner-layer spinner-red-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div>`,
	'xAuthToken' : '615b3a10ba93470e8e642b3b04ffe9c9'
}

export {elementHandler, statusRespons, dataJson, component};
