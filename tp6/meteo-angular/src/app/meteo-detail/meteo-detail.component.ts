import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MeteoService } from "../services/meteo.service";

@Component({
  selector: "app-meteo-detail",
  templateUrl: "./meteo-detail.component.html",
  styleUrls: ["./meteo-detail.component.css"],
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  latlon: string = "";
  forecast: any = null

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.getMeteo();
  }

  getMeteo(): void {
    // pour lire la paramètre 'name' dans l'URL de la page  comme définit dans le router avec
    // path: 'meteo/:name'
    const name = this.route.snapshot.paramMap.get("name");

    console.log("getmeteo pour", name);
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        })
        .catch((fail) => (this.meteo = fail));
    }
  }
  getForecast(): void {
    const name = this.route.snapshot.paramMap.get("name");
    if (name) {
      this.meteoService
        .getForecast(name)
        .then(response => {
          // Filtrer les prévisions pour obtenir une par jour (par exemple à la même heure chaque jour)
          this.forecast;
        })
        .catch(fail => console.error(fail));
    }
  }

}