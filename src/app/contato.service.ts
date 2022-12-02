import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from './contato/contato';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  apiURL: string = environment.apiURLBase + '/api/contatos';

  constructor(
    private http: HttpClient
  ) { }

  salvar(contato : Contato ) : Observable<Contato> {
    return this.http.post<Contato>(`${this.apiURL}`, contato);
  }

  atualizar(contato : Contato) : Observable<any> {
    return this.http.put<Contato>(`${this.apiURL}/${contato.id}`, contato);
  }

  favoritar(contato : Contato) : Observable<any> {
    return this.http.patch<Contato>(`${this.apiURL}/${contato.id}/favorito`, null);
  }

  listarContatos() : Observable<Contato[]>{    
    //const headers = this.recuperaHeaderToken();
    //return this.http.get<Cliente[]>(`${this.apiURL}`, {headers}); 
    return this.http.get<Contato[]>(`${this.apiURL}`);   
  }

  getContatoById(id : number) : Observable<Contato>{
    return this.http.get<Contato>(`${this.apiURL}/${id}`);    
  }

  deleteContato(id : number) : Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/${id}`);    
  }

  upload(contato: Contato, formData: FormData): Observable<any>{
    return this.http.put(`${this.apiURL}/${contato.id}/foto`, formData, {responseType: 'blob'});
  }
}
