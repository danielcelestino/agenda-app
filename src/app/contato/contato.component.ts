import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  
  formularioContato!: FormGroup;
  contatosList: Contato[] = [];
  colunas = ['foto','id','nome','email','favorito'];
  totalElementos? = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOption : number[] = [10];

  constructor(
    private service : ContatoService,
    private fb : FormBuilder,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    //const c : Contato = new Contato();
    //c.nome = 'José';
    //c.email = 'jose@gmail.com';
    //c.favorito = false; 

    //this.formularioContato.controls.nome.errors.required
    
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);

   
  }

  montarFormulario(){
    this.formularioContato = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]]
    })
  }

  listarContatos(pagina:any, tamanho:any){
    this.service.listarContatos(pagina, tamanho).subscribe( response => {
      this.contatosList = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }

  submit(){
    const formValues = this.formularioContato.value;
    const contato : Contato = new Contato(formValues.nome, formValues.email);    
    this.service.salvar(contato).subscribe( resposta => {      
      let lista: Contato[] = [... this.contatosList, resposta];
      this.contatosList = lista;
    });
  }

  favoritar(contato:Contato){    
    this.service.favoritar(contato).subscribe( resposta => {
      contato.favorito = !contato.favorito;
    });
  }

  uploadFoto(event: any, contato:Contato){
    let files = event.target.files;    
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service.upload(contato, formData).subscribe(response => this.listarContatos(this.pagina, this.tamanho));
    }

  }

  visualizarContato(contato:Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }

  paginar(event: PageEvent){
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);

  }

}
