import { Component, OnInit } from '@angular/core';
import { DisplayService} from '../display.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	public usersData;
  p: number=1;

  constructor(private display : DisplayService) { }

  ngOnInit() {
  	this.display.getUsers().subscribe((res)=>{
        this.usersData=res
  			})
		}
}
