import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayService} from '../display.service';
import { Router }          from '@angular/router';

@Component({
  selector: 'app-filterbox',
  templateUrl: './filterbox.component.html',
  styleUrls: ['./filterbox.component.css']
})
export class FilterboxComponent implements OnInit {
	public arr =new Set();
	public y;
  public date1;
  constructor(private route : ActivatedRoute , private display : DisplayService,private router : Router) { }
  ngOnInit() {

    this.display.getMetaData().subscribe((res)=>{

            this.y=res ;

            for (var i =this.y.length - 1; i >= 0; i--) {
                    this.arr.add( this.y[i].Type )
            }

            console.log(this.arr)
    })
    
  }

  submit1(){

      this.router.navigate([`/events/date/${this.date1}`])

  }
}
