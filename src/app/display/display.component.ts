import { Component, OnInit } from '@angular/core';
import { DisplayService} from '../display.service';
import { NavbarComponent} from '../navbar/navbar.component';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public eventData;
  p : number=1;
  i : number=1;
  constructor(private display : DisplayService) { }
  ngOnInit() {
  	this.display.getData().subscribe((res)=>{
        this.eventData=res
  		         });
    }
}
