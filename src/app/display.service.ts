import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { NavbarComponent} from './navbar/navbar.component';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

	private _getEventsUrl='/api/events';
	private _getUsersUrl='/api/users';
  private _getMetaUrl='/api/metadata'
	public p : NavbarComponent;
  constructor(private _http : HttpClient) { }
 public  getData(){
  	return this._http.get(this._getEventsUrl)
  }
  public getUsers(){
  	return this._http.get(this._getUsersUrl)
  }
  public getUser(phone :string){
  	return this._http.get(this._getEventsUrl+'/user/'+phone);
  }
  public getEvents(type :string){
    return this._http.get(this._getEventsUrl+'/eventType/'+type);
  }
  public getMetaData(){
    return this._http.get(this._getMetaUrl);
  }
  public getByDate(date2 : string){
    return this._http.get(this._getEventsUrl+'/date/'+date2)
  }
  public getStatus(status : string){
    return this._http.get(this._getEventsUrl+'/eventStatus/'+status)
  }



}
