import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component'

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  
  formularioContato!: FormGroup;
  contatosList: Contato[] = [];
  colunas = ['foto','id','nome','email','favorito'];

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
    this.listarContatos();

   
  }

  montarFormulario(){
    this.formularioContato = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]]
    })
  }

  listarContatos(){
    this.service.listarContatos().subscribe( response => this.contatosList = response);
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
      this.service.upload(contato, formData).subscribe(response => this.listarContatos());
    }

  }

  visualizarContato(contato:Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '450px',
      data: contato
    })
  }

}
