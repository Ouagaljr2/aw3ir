// meteo.service.ts
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class MeteoService {
  constructor() { }

  getMeteo(name: string): Promise<any> {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather/?q=${name}&units=metric&lang=fr&appid=708ce037de3d146fb523e82869ec5010`
    )
      .then(response => response.json())
      .then(json => {
        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          return Promise.reject(`Météo introuvable pour ${name} (${json.message})`);
        }
      });
  }

  getForecast(name: string): Promise<any> {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast/?q=${name}&lang=fr&appid=0ada432b59deb9716c357092c5f79be6`
    )
      .then(response => response.json())
      .then(json => {
        if (json.cod == "200") {
          return Promise.resolve(json);
        } else {
          return Promise.reject(`Prévisions introuvables pour ${name} (${json.message})`);
        }
      });
  }
}
