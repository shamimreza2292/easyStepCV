import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvDesign1Component } from '../page/cv-design1/cv-design1.component';
import { CvDesign2Component } from '../page/cv-design2/cv-design2.component';


const routes: Routes = [

  {path: '', redirectTo: 'cv-1', pathMatch: 'full' },
  {path: 'cv-1', component: CvDesign1Component},
  {path: 'cv-2', component: CvDesign2Component},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
