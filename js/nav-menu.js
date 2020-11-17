import {deletJadwalTersimpan,viewJadwalTersimpan, showJadwalTersimpan, backToJadwalTersimpan} from "/js/jadwal_tersimpan.js";

const loadNavMenu = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        document.querySelectorAll(".sidenav").forEach(function(elm) {
                elm.innerHTML = xhttp.responseText;
        });

        document.querySelectorAll(".sidenav a").forEach(function(elm) {
            elm.addEventListener("click", function(event) {
            if (window.screen.width < 992){
                let sidenav = document.querySelector(".sidenav");
                M.Sidenav.getInstance(sidenav).close();
            }
            let pg = event.target.getAttribute("href").substr(1);
            loadPage(pg);
            });
        });

      }
    };
    xhttp.open("GET", "pages/main-menu.html", true);
    xhttp.send();
}

const loadPage = (page) => {
    return new Promise((resolve, reject)=> {
		var element = document.getElementById('main-content');

		fetch('pages/' + page + '.html').then((response) => {
			return response.ok ? response.text() :
				response.status == 404 ? Promise.resolve('<div class="container "><div class="card card-content px-3 py-3"><h4 class="blue-grey-text px-3 py-2 text-center">Halaman tidak ditemukan!</h4></div></div>') :	Promise.reject();
		})
        .then((result) => {
			window.scrollTo(0, 0);
            if(page=="jadwal-tersimpan"){
                viewJadwalTersimpan();
            }
            element.innerHTML = result;
            M.AutoInit(); // Inisialiasi komponen materializecss
		})
        .catch(() => {
			element.innerHTML = 'Halman Tidak dapat di akses.';
		});
		resolve(true);
	});
}

export {loadNavMenu, loadPage};
