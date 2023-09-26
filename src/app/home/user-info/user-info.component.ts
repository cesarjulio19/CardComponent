import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  @Input()
  nombre:string = "César Julio";
  @Input()
  apellidos:string = "Martín González";
  @Input()
  edad:number = 24;


  constructor() { }

  ngOnInit() {}

}
