import {loadNavMenu, loadPage} from "/js/nav-menu.js";
import viewKlasemen from "/js/klasemen.js";
import viewTim from "/js/tim.js";
import {viewCompetitionTeam, viewSelectedTeam,viewJadwal} from "/js/jadwal_tanding.js";
import {deletJadwalTersimpan,viewJadwalTersimpan, showJadwalTersimpan, backToJadwalTersimpan} from "/js/jadwal_tersimpan.js";

document.addEventListener("DOMContentLoaded", function(){
    // Activate sidebar nav
      M.Sidenav.init(document.querySelectorAll('.sidenav'));
      loadNavMenu();

      // Load page content
      let page = window.location.hash.substr(1);
      if (page === "") page = "beranda";

      loadPage(page);
      viewKlasemen();
      viewTim();
      viewCompetitionTeam();
      viewSelectedTeam();

      deletJadwalTersimpan();
      showJadwalTersimpan();
      backToJadwalTersimpan();
});
