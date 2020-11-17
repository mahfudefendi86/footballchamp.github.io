var dbPromised = idb.open('AISB_Jadwal', 1, (upgradeDb)=> {
	let jadwal = upgradeDb.createObjectStore('jadwal-pertandingan', {keyPath: 'teamId'});
	jadwal.createIndex('teamName', 'teamName', {unique: false});
});


const saveJadwal = (teamId, teamName, teamIcon, data) => {
	var dataToStore = {
		teamId: teamId,
		teamName: teamName,
        teamIcon : teamIcon,
		data: data
	}
	dbPromised.then((db)=> {
		var tx = db.transaction('jadwal-pertandingan', 'readwrite');
		var store = tx.objectStore('jadwal-pertandingan');
		store.put(dataToStore);
		return tx.complete;
	}).then(()=> {
		M.toast({
			html: `Jadwal pertandingan berhasil disimpan!`
		});
	}).catch((err)=> {
		M.toast({
			html: `Data gagal disimpan <br> ${err}`
		});
	});
}

const getDaftarJadwalTersimpan = () => {
	return new Promise((resolve, reject)=> {
		dbPromised.then((db)=> {
			var tx = db.transaction('jadwal-pertandingan', 'readonly');
			var store = tx.objectStore('jadwal-pertandingan');
			return store.getAll();
		}).then((data)=> {
			resolve(data);
		}).catch((err)=> {
			reject(err);
		})
	})
}

const getJadwalTersimpan = (id) => {
	return new Promise((resolve)=> {
		dbPromised.then((db)=> {
			var tx = db.transaction('jadwal-pertandingan', 'readonly');
			var store = tx.objectStore('jadwal-pertandingan');
			return store.get(id);
		}).then((data)=> {
			resolve(data);
		}).catch((err)=> {
			M.toast({
				html: `Data mungkin rusak, silahkan simpan dari online lagi. Dan buka lewat daftar pertandingan disimpan`,
				displayLength: 6500
			});
		});
	})
}

function hapusJadwalTersimpan(id) {
	dbPromised.then((db)=> {
		var tx = db.transaction('jadwal-pertandingan', 'readwrite');
		var store = tx.objectStore('jadwal-pertandingan');
		store.delete(id);
		return tx.complete;
	}).then(()=> {
		M.toast({
			html: `Data berhasil dihapus`
		});
	}).catch((err)=> {
		M.toast({
			html: `Data gagal dihapus <br> ${err}`
		});
	});
}

export {saveJadwal, getDaftarJadwalTersimpan,hapusJadwalTersimpan,getJadwalTersimpan};
