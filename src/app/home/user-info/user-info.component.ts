import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from '../user-info-fav-clicked';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  private _nombre:string = "";
@Input() set nombre(new_nombre:string) {
	this._nombre = new_nombre
}
get nombre():string {
	return this._nombre
}

private _apellido:string = "";
@Input() set apellido(new_apellido:string) {
	this._apellido = new_apellido
}
get apellido():string {
	return this._apellido
}

private _edad:number = 0;
@Input() set edad(new_edad:number) {
	this._edad = new_edad
}
get edad():number {
	return this._edad
}

private _fav:boolean = false;
@Input() set fav(new_fav:boolean) {
	this._fav = new_fav
}
get fav():boolean {
	return this._fav
}

@Input() user: User = {} as User;

onFavClick(event: any) {

  this.onFavClicked.emit({
    fav:!(this.user?.fav??false) //devolvemos el estado contrario al que tenemos
  });
  event.stopPropagation();
}




  constructor() {
    
   }

  ngOnInit() {}

}
