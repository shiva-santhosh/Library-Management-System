import { Component, OnInit } from '@angular/core';
import {  NavbarComponent }  from '../navbar/navbar.component';
import  {   DisplayService } from '../display.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-userid',
  templateUrl: './userid.component.html',
  styleUrls: ['./userid.component.css']
})
export class UseridComponent implements OnInit {

	z : NavbarComponent;
  p : number =1;
	public userData;
	public phone;
  constructor(private display : DisplayService ,private route : ActivatedRoute) { }

  ngOnInit() {
  	    this.route.paramMap.subscribe(params=>{
            this.phone=params.get('id')
  		      this.display.getUser(this.phone).subscribe((res)=>{
                this.userData=res
            })
  	    })
  	}
}

