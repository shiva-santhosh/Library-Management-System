import { Component, OnInit } from '@angular/core';
import { DisplayService} from '../display.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-evnts',
  templateUrl: './evnts.component.html',
  styleUrls: ['./evnts.component.css']
})
export class EvntsComponent implements OnInit {

	public eventTypeData;
  public event ;
	p : number=1;

  constructor(private display : DisplayService , private route : ActivatedRoute) { }
  ngOnInit() {
  		 this.route.paramMap.subscribe(params=>{
         this.event=params.get('id1')
         console.log(params.get('id1'))
  		this.display.getEvents(params.get('id1')).subscribe((res)=>{
          this.eventTypeData=res
      })
  	})
  }
}
