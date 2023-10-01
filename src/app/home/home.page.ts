import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info-fav-clicked';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  [x: string]: any; 

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  users$:Observable<User[]> = this._users.asObservable();

  ngOnInit(): void {
    let users: User[] = [
      { id: 1, nombre: 'César', apellido: 'Martín', edad: 24, fav: true},
      { id: 2, nombre: 'Antonio', apellido: 'Ruiz', edad: 23, fav: false},
      { id: 3, nombre: 'Guille', apellido: 'Lopez', edad: 24, fav: true},
      { id: 4, nombre: 'Javier', apellido: 'España', edad: 34, fav: true},
      { id: 5, nombre: 'María', apellido: 'Martín', edad: 16, fav: false},
    ]
    var index = 0
	  // Utilizamos setInterval para agregar usuarios adicionales al BehaviorSubject cada segundo
	  setInterval(() => {
	    if (index < 5) {
	      let user: User[] = this._users.value; // Obtenemos la lista actual de usuarios
	      user.push(users[index]); // Agregamos un usuario de la lista actual al final
	      this._users.next(user); // Actualizamos el BehaviorSubject con la nueva lista
	      index++; // Incrementamos el índice para seleccionar el próximo usuario
	    }
	  }, 1000);
  }

  constructor(private router: Router,
    private toast: ToastController) {
    
  }

  public onFavClicked(user:User, event:UserInfoFavClicked){

    //recibimos en user el usuario asociado a la tarjeta
    //recibimos en event un objeto del tipo UserInfoFavClicked que tiene una propiedad fav que indica si hay que añadir o eliminar de la lista de favoritos
    //creamos una copia del array actual de usuarios
    const users = [...this._users.value];
    //buscamos el índice del usuario para modificar su propiedad fav
    var index = users.findIndex((_user)=>_user.id == user.id);
    if(index!=-1)
      //actualizamos la propiedad fav con el valor que hemos recibido por el evento
      users[index].fav = event.fav??false; //en el caso de que fav sea undefined devolvemos falso.
    //notificamos un nuevo array de usuarios para que se renderice en la plantilla
    this._users.next([...users]);
    //Notificamos con un Toast que se ha pulsado
    const options:ToastOptions = {
      message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`, //mensaje del toast
      duration:1000, // 1 segundo
      position:'bottom', // el toast se situa en la parte inferior
      color:'danger', // color del toast
      cssClass:'fav-ion-toast' //Una clase que podemos poner en global.scss para configurar el ion-toast
    };
 
 
    //creamos el toast y lo presentamos (es una promesa por eso el then)
    this.toast.create(options).then(toast=>toast.present());
  }
 

  
 

}

