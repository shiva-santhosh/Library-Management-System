import { Component, OnInit } from '@angular/core';
import { Router }          from '@angular/router';
import  {   DisplayService } from '../display.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  public date ;
  public userData;
  p : number = 1 ;
  constructor(private display : DisplayService ,private route : ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=>{
            this.date=params.get('id2')
  		      this.display.getByDate(params.get('id2')).subscribe((res)=>{
                this.userData=res
            })
  	    })
  }

}
