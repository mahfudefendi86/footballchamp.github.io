import {elementHandler, statusRespons, dataJson, component} from "/js/apiHandler.js";

const viewTim = () =>{
    elementHandler('select#nama-liga-tim', 'change', (event) => {
        var elTim = document.getElementById('daftar-tim');
		elTim.innerHTML = component.loaderAnimation;
		let competitionId = event.target.value;
        fetch(`${component.baseUrl}competitions/${competitionId}/teams`, {
            headers: {
                'X-Auth-Token': component.xAuthToken
            }
        })
        .then(statusRespons)
        .then(dataJson)
        .then((result) => {
            dataTeams(result, elTim);
        }).catch((err) => {
            M.toast({
                html: `Gagal mengambil data <br> (${err})`,
                classes: 'rounded'
            });
            elTim.innerHTML = "";
        });
    });


}

// Untuk merender tabel daftar tim
const dataTeams = (data, element) => {
    var dataGrid = '';
    data.teams.forEach((team)=> {
        var url = team.crestUrl;
        url = url.replace(/^http:\/\//i, 'https://');
        dataGrid += `
            <div class="col s12 m12">
                <div class="card">
                    <div class="card-content px-1 py-2" style="background:rgb(250, 250, 250);">
                        <div class="row">
                            <div class="col s12 m4 l4">
                                <img src="${url}" class="materialboxed text-center py-2" alt="logo" width="200px" />
                            </div>
                            <div class="col s12 m8 l8">
                                <table class="striped">
                                    <tr>
                                        <th width="25%">Nama Tim</th><td width="75%"><strong>${team.name}</strong> <em>(${team.shortName} - ${team.tla})</em></td>
                                    </tr>
                                    <tr>
                                        <th width="25%">Tahun</th><td width="75%">${team.founded}</td>
                                    </tr>
                                    <tr>
                                        <th width="25%">Alamat</th><td width="75%">${team.address}</td>
                                    </tr>
                                    <tr>
                                        <th width="25%">Stadion</th><td width="75%">${team.venue}</td>
                                    </tr>
                                    <tr>
                                        <th width="25%">Website</th><td width="75%"><a target="_blank" href="${team.website}">${team.website}</a></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
	});

	var htmlElement =	`
		<div class="card">
			<div class="card-content">
                <div class="blue-grey-text px-3" style="padding-top:1em!important; font-size:20px; font-weight:500; line-height:20px;">Daftar Tim Pemain di Liga</div>
				<div class="blue-grey-text px-3" style=" font-size:30px; font-weight:bold;">${data.competition.area.name} - ${data.competition.name}</div>
				<span class="px-3" style="font-size:16px; color:#58738b;">Periode: ${data.season.startDate} s/d ${data.season.endDate}</span>
                <div class="divider" style="margin:10px 0px;"></div>
                <div class="row px-1">
				    ${dataGrid}
                </div>
			</div>
		</div>
	`;

	element.innerHTML = htmlElement;
    M.AutoInit();
}


export default viewTim ;
