import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public phoneNum;

  constructor(private router : Router) { }
  ngOnInit() {
  }
  submit(){
  	//console.log("abcdef")
  	this.router.navigate([`/users/${this.phoneNum}`])
  }
}
