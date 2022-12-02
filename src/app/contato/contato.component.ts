import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  
  formularioContato!: FormGroup;
  contatosList: Contato[] = [];
  colunas = ['id','nome','email','favorito'];

  constructor(
    private service : ContatoService,
    private fb : FormBuilder 
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

}
