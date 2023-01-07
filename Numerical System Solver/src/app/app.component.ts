import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import {JacobiComponent} from "./jacobi/jacobi.component";
import {SeidelComponent} from "./seidel/seidel.component";
import {GaussComponent} from "./gauss/gauss.component";
import {LuComponent} from "./lu/lu.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor() {
  }

  ngOnInit() {
  }
}

