import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MovieTvBase } from '../../models/movie-tv-base';

type ApiResponse = {page: number, results: MovieTvBase[]};

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl = 'https://api.themoviedb.org/3';

  options = {
    api_key: '98f47ca1b3bbb24cd108b853772ce2aa',
    language: 'pt-BR'
  }


  constructor(private http: HttpClient) { }

  trending(): Observable<MovieTvBase[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
      params: this.options,
    }).pipe(map(data => data.results));
  }

  search(query: string): Observable<MovieTvBase[]>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/search/multi`, {
      params: {
        ...this.options,
        include_adult: false,
        query: query,
      },
    })
    .pipe(map((data) => data.results));
  }
}