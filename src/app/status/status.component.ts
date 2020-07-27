import { Component, OnInit } from '@angular/core';
import  {   DisplayService } from '../display.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {


  p : number =1;
  public userData;
  public status;
  constructor(private display : DisplayService ,private route : ActivatedRoute) { }

  ngOnInit() {

  		  	this.route.paramMap.subscribe(params=>{
            this.status=params.get('id3')
  		      this.display.getStatus(params.get('id3')).subscribe((res)=>{
              this.userData=res
             })
  	      })
  }

}
