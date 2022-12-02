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

  salvar(cliente : Contato ) : Observable<Contato> {
    return this.http.post<Contato>(`${this.apiURL}`, cliente);
  }

  atualizar(cliente : Contato) : Observable<any> {
    return this.http.put<Contato>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  favoritar(cliente : Contato) : Observable<any> {
    return this.http.patch<Contato>(`${this.apiURL}/${cliente.id}/favorito`, null);
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
}
