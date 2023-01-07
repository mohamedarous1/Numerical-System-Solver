import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JacobiComponent } from './jacobi/jacobi.component';
import { SeidelComponent } from './seidel/seidel.component';
import {FormsModule} from "@angular/forms";
import { LuComponent } from './lu/lu.component';
import {GaussComponent} from "./gauss/gauss.component";
import { DisplayComponent } from './display/display.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PlotterComponent } from './plotter/plotter.component';
import { CompComponent } from './nonlinear/comp.component';
@NgModule({
  declarations: [
    AppComponent,
    JacobiComponent,
    SeidelComponent,
    LuComponent,
    GaussComponent,
    DisplayComponent,
    MainViewComponent,
    PlotterComponent,
    CompComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
