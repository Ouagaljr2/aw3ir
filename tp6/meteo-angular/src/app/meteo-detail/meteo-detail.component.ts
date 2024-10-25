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
  forecast: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.getMeteo();
    this.getForecast();
  }

  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get("name");
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
          // Filtrer pour une prévision par jour (exemple: 12h chaque jour)
          this.forecast = response.list.filter((item: any) => item.dt_txt.includes("12:00:00"));
        })
        .catch(fail => console.error(fail));
    }
  }
}
