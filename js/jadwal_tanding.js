import {elementHandler, statusRespons, dataJson, component} from "/js/apiHandler.js";
import {saveJadwal, getDaftarJadwalTersimpan}  from "/js/db_jadwal.js";

const viewCompetitionTeam = () => {
    elementHandler('select#nama-liga-jadwal', 'change', (event)=> {
        var elTim = document.getElementById('container-tim');
        elTim.innerHTML = component.loaderAnimation;
		let competitionId = event.target.value;
        fetch(`${component.baseUrl}competitions/${competitionId}/teams`, {
            headers: {
                'X-Auth-Token': component.xAuthToken
            }
        })
        .then(statusRespons)
        .then(dataJson)
        .then((result)=> {
            pilihTim(result, elTim);
            document.getElementById('simpan-jadwal').classList.add('hide');
        }).catch((err) => {
            M.toast({
                html: `Gagal mengambil data <br> (${err})`
            });
            elTim.innerHTML = '';
        });
    });
};

const pilihTim = (data, element) => {
	var htmlElement = `<div class="card px-3 py-2">
        <div class="card-content">
        <div class="input-field col s12 m6">
        <select class="icons">
            <option value="" disabled selected>Pilih Tim</option>`;
	data.teams.forEach((team) => {
        let url = team.crestUrl;
    	url = url.replace(/^http:\/\//i, 'https://');
		htmlElement += `<option value="${team.id}" data-icon="${url}">${team.name}</option>`;
	});
	htmlElement += `</select>
        </div>
        <br>
        <a class="waves-effect waves-light btn btn-large blue darken-3" id="simpan-jadwal"> Simpan Jadwal <i class="material-icons right">save</i></a>
        <div id="container-jadwal"></div>
        </div>
    </div>`;

	element.innerHTML = htmlElement;
	M.AutoInit();
}

var tempDataPertandingan;
const viewSelectedTeam = () => {
    // Event listener untuk menampilkan jadwal pertandingan tim
    elementHandler('#container-tim select', 'change', (event)=> {
        let elJadwal = document.getElementById('container-jadwal');
        elJadwal.innerHTML = component.loaderAnimation;
        let teamId = event.target.value;
        document.getElementById('simpan-jadwal').classList.add('hide');

        fetch(`${component.baseUrl}teams/${teamId}/matches/`, {
            headers: {
                'X-Auth-Token':  component.xAuthToken
            }
        })
        .then(statusRespons)
        .then(dataJson)
        .then((result)=> {
            viewJadwal(result, elJadwal);
            tempDataPertandingan = result;
            document.getElementById('simpan-jadwal').classList.remove('hide');
        }).catch((err) => {
            M.toast({
                html: `Gagal mengambil data <br> (${err})`
            });
            elJadwal.innerHTML = '';
        });
    });

    elementHandler('#simpan-jadwal', 'click', ()=> {
        let seletedTim = document.querySelector('#container-tim select');
        let teamId = seletedTim.value;
        let teamName = seletedTim[seletedTim.selectedIndex].innerHTML;
        let teamIcon = seletedTim[seletedTim.selectedIndex].getAttribute('data-icon');
        saveJadwal(teamId, teamName, teamIcon, tempDataPertandingan);
    });

    elementHandler('#view-jadwal-tersimpan', 'click', ()=> {
        let pg = this.getAttribute("href").substr(1);
    });

};

// Untuk merender jadwal pertandingan tim
const viewJadwal = (data, elementContainer, idOfTeam = null, nameOfTeam = null, iconTeam = null) => {
	var seletedTim = document.querySelector('#container-tim select');
	if (seletedTim !== null) {
		idOfTeam = seletedTim.value
		nameOfTeam = seletedTim[seletedTim.selectedIndex].innerHTML;
        iconTeam = seletedTim[seletedTim.selectedIndex].getAttribute('data-icon');
	}
	var tableData = '';

	data.matches.forEach((match) => {

		var venue = (match.homeTeam.id == idOfTeam) ? 'HOME' : 'AWAY';
		var vs = (venue == 'HOME') ? match.awayTeam.name : match.homeTeam.name;

		if (venue == 'HOME' && match.score.winner !== null) {
			var isWinner = (match.score.winner == 'HOME_TEAM') ? 'WIN' : (match.score.winner == 'AWAY_TEAM') ? 'LOSE' : 'DRAW';
			var score = match.score.fullTime.homeTeam;
			var rivalScore = match.score.fullTime.awayTeam;
		} else if (venue == 'AWAY' && match.score.winner !== null){
			var isWinner = (match.score.winner == 'AWAY_TEAM') ? 'WIN' : (match.score.winner == 'HOME_TEAM') ? 'LOSE' : 'DRAW';
			var score = match.score.fullTime.awayTeam;
			var rivalScore = match.score.fullTime.homeTeam;
		} else {
			var isWinner = '';
			var score = '';
			var rivalScore = '';
		}
        let status='';
        if(match.status==="FINISHED"){
            status = `<span class="status bg_finish" >FINISHED</span>`;
        }else
        if(match.status==="IN_PLAY"){
            status = `<span class="status bg_inplay">IN_PLAY</span>`;
        }else
        if(match.status==="SCHEDULED"){
            status = `<span class="status bg_scheduled">SCHEDULED</span>`;
        }
		tableData += `
			<tr>
				<td>${match.competition.name}</td>
				<td>${new Date(match.utcDate).toLocaleString()}</td>
				<td>${vs}</td>
				<td>${status}</td>
				<td>${isWinner}&nbsp${score}&nbsp-&nbsp${rivalScore}</td>
				<td>${venue}</td>
			</tr>
		`;
	});

	var htmlElement = `
		<div class="">
            <div class="text-center py-2">
                <h6 style="margin:15px 0px!important;" class="blue-grey-text">Jadwal Pertandingan</h6>
                <img src="${iconTeam}" class="materialboxed text-center" alt="logo" width="80px" />
    			<div style="font-size:20pt;" class="teal-text darken-4"><strong>${nameOfTeam.replace(/\s/g,'&nbsp')}</strong></div>
            </div>
			<table class="striped highlight centered responsive-table">
				<thead>
					<tr>
						<th>Kompetisi</th>
						<th>Jadwal</th>
						<th>Lawan Tanding</th>
						<th>Status</th>
						<th>Score</th>
						<th>Venue</th>
					</tr>
				</thead>
				<tbody>${tableData}</tbody>
			</table>
		</div>
	`;

	elementContainer.innerHTML = htmlElement;
    M.AutoInit();
}


export {viewCompetitionTeam, viewSelectedTeam,viewJadwal} ;
