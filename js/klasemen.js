import {elementHandler, statusRespons, dataJson, component} from "/js/apiHandler.js";
var tempKlasemen;

const viewKlasemen = () =>{
    elementHandler('select#nama-liga', 'change', (event) => {
        var elKlasemen = document.getElementById('data-klasemen');
        elKlasemen.innerHTML = component.loaderAnimation;
        let competitionId = event.target.value;

        fetch(`${component.baseUrl}competitions/${competitionId}/standings`, {
            headers: {
                'X-Auth-Token': component.xAuthToken
            }
        })
        .then(statusRespons)
        .then(dataJson)
        .then((result) => {
            dataKlasemen(result, elKlasemen);
            tempKlasemen = result;
        }).catch((err) => {
            M.toast({
                html: `Gagal mengambil data <br> (${err})`,
                classes: 'rounded'
            });
            elKlasemen.innerHTML = "";
        });
    });

    // Event Listener untuk pergantian pilihan data klasemen
	elementHandler('#type, #stage', 'change', ()=> {
		var type = document.getElementById('type');
		var stage = document.getElementById('stage');
		dataKlasemen(tempKlasemen, document.getElementById('data-klasemen'), type.value, stage.value);
	});
}

// Untuk merender tabel klasemen
const dataKlasemen = (data, element, tipe = null, tahap = null) => {
	if (tipe == null) tipe = data.standings[0].type;
	if (tahap == null) tahap = data.standings[0].stage;

	// Variabel list untuk setiap tipe & tahap klasemen
	var standingsStage = [];
	var standingsType= [];

	var vthead = `<thead><tr><th>#</th><th colspan="2">Team</th><th>Play</th><th>Win</th><th>Draw</th><th>Lose</th><th>Pts</th><th>GF</th><th>GA</th><th>GD</th></tr></thead>`;

	// Variabel untuk data pada tabel
	var DataKlasemen = '';

	// Perulangan untuk tiap data klasemen
	data.standings.forEach((standing) => {

		if (!(standingsStage.includes(standing.stage))) standingsStage.push(standing.stage);
		if (!(standingsType.includes(standing.type))) standingsType.push(standing.type);
		if (standing.stage === 'GROUP_STAGE' && standing.type === tipe) {
			DataKlasemen += `
				<thead>
					<tr>
						<th colspan="11">${standing.group}</th>
					</tr>
				</thead>
				${vthead}
			`;

			DataKlasemen += '<tbody>';
			standing.table.forEach((data) => {
				let url = data.team.crestUrl;
    			url = url.replace(/^http:\/\//i, 'https://');
				DataKlasemen += `
					<tr>
						<td>${data.position}</td>
						<td class="hide-on-med-and-down"><img src="${url}" class="logo-team"></td>
						<td class="title-team">${data.team.name}</td>
						<td>${data.playedGames}</td>
						<td>${data.won}</td>
						<td>${data.draw}</td>
						<td>${data.lost}</td>
						<td>${data.points}</td>
						<td>${data.goalsFor}</td>
						<td>${data.goalsAgainst}</td>
						<td>${data.goalDifference}</td>
					</tr>
				`;
			});
			DataKlasemen += '</tbody>';

		} else if (standing.type === tipe) {
			DataKlasemen += vthead;
			DataKlasemen += '<tbody>';
			standing.table.forEach((data) => {
				let url = data.team.crestUrl;
    			url = url.replace(/^http:\/\//i, 'https://');
				DataKlasemen += `
					<tr>
						<td>${data.position}</td>
						<td class="hide-on-med-and-down"><img src="${url}" class="logo-team"></td>
						<td class="title-team">${data.team.name}</td>
						<td>${data.playedGames}</td>
						<td>${data.won}</td>
						<td>${data.draw}</td>
						<td>${data.lost}</td>
						<td>${data.points}</td>
						<td>${data.goalsFor}</td>
						<td>${data.goalsAgainst}</td>
						<td>${data.goalDifference}</td>
					</tr>
				`;
			});
			DataKlasemen += '</tbody>';
		}
	});

	var standingTypeElm = standingsType.map((standingType)=> {
		if (standingType === tipe) return `<option value="${standingType}" selected>${standingType}</option>`;
		else return `<option value="${standingType}">${standingType}</option>`;
	}).join();

	var standingStageElm = standingsStage.map((standingStage)=> {
		if (standingStage === tahap) return `<option value="${standingStage}" selected>${standingStage}</option>`;
		else return `<option value="${standingStage}">${standingStage}</option>`;
	}).join();

	var htmlElement = `
		<div class="card grey lighten-5">
			<div class="card-content">
				<h4 class="blue-grey-text px-3" style="padding-top:1em!important; font-weight:bold;">${data.competition.area.name} - ${data.competition.name}</h4>
				<span class="px-3" style="font-size:16px; color:#58738b;">Periode: ${data.season.startDate} s/d ${data.season.endDate}</span>
				<div class="divider" style="margin:10px 0px;"></div>
				<div class="row  px-3 py-2">
                    <div class="col s12 m6">
                        <div class="input-field"> <select name="stage" id="stage">
                            ${standingStageElm}
                        </select> <label>Stage</label> </div>
                    </div>
					<div class="col s12 m6">
						<div class="input-field"> <select name="type" id="type">
							${standingTypeElm}
						</select> <label>Type</label> </div>
					</div>
				</div>
				<br>
				<table class="striped highlight centered responsive-table">${DataKlasemen}</table>
			</div>
		</div>
	`;

	element.innerHTML = htmlElement;
	M.AutoInit();
}

export default viewKlasemen ;
