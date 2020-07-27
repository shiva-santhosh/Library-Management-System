import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent} from './display/display.component' ;
import {UsersComponent} from './users/users.component';
import { UseridComponent } from './userid/userid.component';
import  {EvntsComponent} from './evnts/evnts.component' ;
import {DateComponent} from './date/date.component' ;
import {StatusComponent} from './status/status.component' ;

const routes: Routes = [
{ path : 'events', component: DisplayComponent },
{ path : 'events/eventStatus/:id3', component: StatusComponent },
{ path :  'events/:id1' , component : EvntsComponent},
{ path :  'events/date/:id2' , component : DateComponent},
{ path : 'users' , component :UsersComponent} ,
{ path :  'users/:id' , component : UseridComponent  } ,
{ path: '', redirectTo: '/events', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
