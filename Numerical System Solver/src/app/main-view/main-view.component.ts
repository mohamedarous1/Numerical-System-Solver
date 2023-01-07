import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {size} from "mathjs";
import {DisplayComponent} from "../display/display.component";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  size:number=0;
  arr:any=[];
  type:any=.001;
  str:string='gaussG';
  str2:string="iter";
  multi:any=[];
  jacobiPar:number=0;
  b:any=[];
  per:number=6;
  gaussFlag:boolean=true;
  flag:boolean=false;
  intial:any=[];
  getEnable(){
    if(this.str=="gaussG")return true;
    if(this.str=="gaussE")return true;
    return false;
  }
  getEnable2(){
    if(this.str=="jacobi")return true;
    if(this.str=="seidel")return true;
    return false;
  }
  constructor(private router : Router) { }

  ngOnInit(): void {

  }

  inputChange(){
      this.arr=[];
      this.multi=Array(this.size).fill(0).map(x => Array(this.size).fill(0));
      this.b=Array(this.size).fill(0);
      this.intial=Array(this.size).fill(0);
      for(let i=0;i<this.size;i++){
        this.arr[i]=i;
      }
      console.log(this.multi,this.intial,this.b);
  }
  submit(){

    DisplayComponent.multi=[];
    this.router.navigate(['/answer']);
    if(this.getEnable()) {
      DisplayComponent.solve(this.str,this.size,this.multi,this.b,this.per,this.gaussFlag,0,0);
    }else {
      DisplayComponent.solve(this.str,this.size,this.multi,this.b,this.per,this.type,this.jacobiPar,this.intial);
    }

  }
}
