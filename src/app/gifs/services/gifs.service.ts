import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchGifsRespone } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'  //servicio global en la app
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private giphyApiKey: string = 'MGrGC7Aqt6I5atdellHflYt2xexEYdbE';

  private _historial: string[] = [];

  public resultados: Gif[] =[];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient)  {
	  //if(localStorage.getItem('historial')) {
	  //	this._historial = JSON.parse(localStorage.getItem('historial')!);
	  //}
	  this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

	  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];


  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();

    //para evitar suplicados
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
	  //solo guarda los 10 últimos ...
	  this._historial = this._historial.splice(0,9);

	  localStorage.setItem('historial',JSON.stringify(this._historial));
    }
    
	const params = new HttpParams()
		.set('api_key',this.giphyApiKey)
		.set('limit','10')
		.set('q',query);

    
    this.http.get<SearchGifsRespone>(`${this.servicioUrl}/search`,{params})
            .subscribe( (resp) => {
              //console.log(resp.data);
			  this.resultados = resp.data;
			  localStorage.setItem('resultados',JSON.stringify(this.resultados));
            });

  }
}
