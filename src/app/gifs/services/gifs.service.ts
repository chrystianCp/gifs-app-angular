import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'WsMiQmRKoBwHuqBwF9eEeNHMs2jtE5hI';
  private _historial: string[] = [];

  //TODO: cambiar tipado correcto
  public resultados: Gif [] = [];

  get historial(){
    return [...this._historial];
  }

  constructor( private http: HttpClient ){
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];
    // if(this._historial.length !== 0){
      // this.buscarGifs(JSON.parse( localStorage.getItem('historial')!)[0] || []);
    // }
    
    
  }

  buscarGifs(query: string){
    
    query = query.trim().toLowerCase();

    if( !this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }  
    
    this.http.get<SearchGifsResponse>( `https://api.giphy.com/v1/gifs/search?api_key=WsMiQmRKoBwHuqBwF9eEeNHMs2jtE5hI&q=${query}&limit=12`)
          .subscribe( resp => {
            console.log(resp.data);
            this.resultados = resp.data;
            localStorage.setItem('resultados', JSON.stringify( this.resultados )); 
          })

    // console.log(this._historial);
  }
}
