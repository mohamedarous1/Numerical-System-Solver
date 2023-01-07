import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes = [
  
  {
    path : 'view',
    component : MainViewComponent
  },
  { 
    path: 'answer',
    component:  DisplayComponent
  },
  { 
    path: '**',
    redirectTo : 'view',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
