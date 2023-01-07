import { Component, OnInit } from '@angular/core';
import {JacobiComponent} from "../jacobi/jacobi.component";
import {SeidelComponent} from "../seidel/seidel.component";
import {GaussComponent} from "../gauss/gauss.component";
import {LuComponent} from "../lu/lu.component";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit{
  size:number=0;
  name:string="";
  method:string="";
  b:any[]=[];

  static multi: any[][] = [];
  mul : any[][] = [];
  constructor() {
    this.mul = DisplayComponent.multi
  }
  ngOnInit() {
    this.mul = DisplayComponent.multi
    console.log("gggg");
  }
  static solve(method:string,size:number,matrix:any,b:any,per:number,type:any,error:any,intials:any) {
    let old=performance.now();
    if(method=="gaussG"){
      let gauss=new GaussComponent();
      this.multi=gauss.InitializeProgram(matrix,b,true,type,per);
    }else if(method=="gaussE"){
      let gauss=new GaussComponent();
      this.multi=gauss.InitializeProgram(matrix,b,false,type,per);
    }else if(method=="jacobi"){
      let jacobi=new JacobiComponent();
      this.multi=jacobi.jacobi(matrix,size,b,intials,type,error,per);
    }else if(method=="seidel"){
      let seidal=new SeidelComponent();
      this.multi= seidal.seidel(matrix,size,b,intials,type,error,per);
    }else if(method=="luC"){
      let lu=new LuComponent();
      this.multi=lu.court_form(matrix,size,b,per);
    }else if(method=="lud"){
      let lu=new LuComponent();
      this.multi=lu.doolittle_form(matrix,size,b,per);
    }else if(method=="luCh"){
      let lu=new LuComponent();
      this.multi=lu.cholescky(matrix,size,b,per);
    }
    let date=performance.now();
    console.log(old);
    console.log(date);
    let n2 =date-old;
    this.multi.push(["The time in MS is : "+n2]);
  }


  getType(input:any):boolean{
    if(typeof input=="string"){
      return true;
    }
    return false;
  }
}

enum OperationType
{
  NormalGauss,
  GaussJordan
}

enum ScalingState
{
  Scaled,
  NotScaled
}
