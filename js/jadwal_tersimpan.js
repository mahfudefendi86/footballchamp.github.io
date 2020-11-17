import  {saveJadwal, getDaftarJadwalTersimpan,hapusJadwalTersimpan,getJadwalTersimpan} from "/js/db_jadwal.js";
import {elementHandler, statusRespons, dataJson, component} from "/js/apiHandler.js"
import {viewCompetitionTeam, viewSelectedTeam,viewJadwal} from "/js/jadwal_tanding.js";
import {loadNavMenu, loadPage} from "/js/nav-menu.js";

const viewJadwalTersimpan = () =>{
    getDaftarJadwalTersimpan()
       .then((data)=> {
           daftarJadwalTersimpan(data);
           document.getElementById('backToJadwalTersimpan').classList.add('hide');
       })
}

const deletJadwalTersimpan = () => {
    elementHandler('.hapus-jadwal-tersimpan', 'click', (event)=> {
		var id = event.target.dataset.id;
		if(confirm("Apakah anda yakin akan menghapus jadwal pertandingan ?")==true){
			hapusJadwalTersimpan(id);
        	getDaftarJadwalTersimpan().then((data)=> {
               daftarJadwalTersimpan(data);
           	})
		}
        
    });
}

const daftarJadwalTersimpan = (data) => {
	var tableData = '';
	data.forEach((data)=> {
		tableData += `
			<tr>
                <td><img src="${data.teamIcon}"  class="logo-team" alt="logo team ${data.teamName}" /></td>
				<td>${data.teamName}</td>
				<td>
					<a data-id="${data.teamId}" class="waves-effect waves-light btn-small lihat-jadwal-tersimpan"><i class="material-icons left">done</i> Lihat</a>
				</td>
				<td>
					<a data-id="${data.teamId}" class="waves-effect waves-light red accent-4 btn-small hapus-jadwal-tersimpan"><i class="material-icons left">cancel</i> Hapus</a>
				</td>
			</tr>
		`;
	});
	var htmlElement = `
		<table class="striped highlight centered responsive-table">
			<thead>
				<tr>
                    <th></th>
					<th>Nama Tim</th>
					<th>Lihat</th>
					<th>Hapus</th>
				</tr>
			</thead>
			<tbody>${tableData}</tbody>
		</table>
	`;
    var elementContainer= document.getElementById('daftar-jadwal-tersimpan');
    document.getElementById('backToJadwalTersimpan').classList.add('hide');
    if(elementContainer!==null){
        elementContainer.innerHTML = component.loaderAnimation;
        elementContainer.innerHTML = htmlElement;
    }

}

const showJadwalTersimpan = () => {
    elementHandler('.lihat-jadwal-tersimpan', 'click', (event)=> {
		let tempId = event.target.dataset.id;
        getJadwalTersimpan(tempId).then((result)=> {
            document.getElementById('backToJadwalTersimpan').classList.remove('hide');
            viewJadwal(result.data, document.getElementById('daftar-jadwal-tersimpan'), result.teamId, result.teamName, result.teamIcon);
        });
	})
}

const backToJadwalTersimpan = () => {
    elementHandler('#backToJadwalTersimpan', 'click', (event)=> {
        loadPage('jadwal-tersimpan');
	})
}

export {deletJadwalTersimpan,viewJadwalTersimpan, showJadwalTersimpan, backToJadwalTersimpan};
