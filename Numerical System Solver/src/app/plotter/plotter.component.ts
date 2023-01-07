import { number, smaller } from 'mathjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as math from "mathjs";
@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit {
  static expression1:string;      //should carry the mathmatical function that should be sent from rootFinding component
  expression2:string ="";
  static method:string ;
  static xmin:number;
  static xmax:number;
  static result = 0;
   static _sol:string[];

   get sol(): string[] {
    return PlotterComponent._sol;
  }

   set sol(value: string[]) {
     PlotterComponent._sol = value;
  }

  scale:number =10;     // 10 pixels from x=0 to x=1

  constructor(private router:Router) { }

  ngOnInit(): void {


    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    canvas.getContext("2d")?.clearRect(0,0,canvas.width,canvas.height)
    this.draw();
    console.log(PlotterComponent.expression1);
  }

  setFunction2(exp:string):void{
    this.expression2 = exp;
  }

  substitute(x:number,noExp:number):number{
    var substitution='';
    if(noExp == 1){
      substitution = PlotterComponent.expression1;

    }else{
      substitution = this.expression2;

    }

    return math.simplify(math.parse(substitution).toString()).evaluate({x:x});
  }

  draw() {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    if (null==canvas || !canvas.getContext) return;
    var axes:any={};
    var ctx=canvas.getContext("2d");
    axes.x0 = .5 + .5*canvas.width;  
    axes.y0 = .5 + .5*canvas.height; 
    axes.scale = this.scale;
    axes.doNegativeX = true;
    this.showAxes(ctx!,axes);
    console.log("ahmed");
    this.setGraph(ctx!,axes,"rgb(255,0,0)",1,1);
    if(PlotterComponent.method=="Fixed Point")
    {
      this.setFunction2("x");
      this.setGraph(ctx!,axes,"rgb(0,0,255)",1,2);
    }
  }

  setGraph (ctx:CanvasRenderingContext2D ,axes:any,color:string,thick:number,noExp:number) {
    var xx, yy, x0=axes.x0, y0=axes.y0, scale=axes.scale;
    var iMax = 15;
    var iMin = -15;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;
    for (var i=iMin;i<=iMax;i=i+0.1) {
      xx = scale*i;
      yy = scale*this.substitute(xx/scale,noExp);
      if (i==iMin){
        ctx.moveTo(x0+xx,y0-yy);
      }else{
        ctx.lineTo(x0+xx,y0-yy);
      }
    }
    ctx.stroke();
  }
  showAxes(ctx:CanvasRenderingContext2D,axes:any) {
    var x0=axes.x0, w=ctx.canvas.width;
    var y0=axes.y0, h=ctx.canvas.height;
    var xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.lineWidth = 1;

    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.moveTo(xmin,y0);
    ctx.lineTo(w,y0);  // X axis

    ctx.moveTo(x0,0);
    ctx.lineTo(x0,h);  // Y axis

    for(var i = Math.round(w/2)+this.scale ;i<=Math.round(w);i=i+this.scale)
    {
      ctx.moveTo(i,y0-2);
      ctx.lineTo(i,y0+2);
    }
    for(var i = Math.round(w/2)-this.scale ;i>=Math.round(xmin);i=i-this.scale)
    {
      ctx.moveTo(i,y0-2);
      ctx.lineTo(i,y0+2);
    }
    for(var i = Math.round(h/2)+this.scale ;i<=Math.round(h);i=i+this.scale)
    {
      ctx.moveTo(x0-2,i);
      ctx.lineTo(x0+2,i);
    }
    for(var i = Math.round(h/2)-this.scale ;i>=0;i=i-this.scale)
    {
      ctx.moveTo(x0-2,i);
      ctx.lineTo(x0+2,i);
    }
    ctx.stroke();
  }
  get getresult()
  {
    return PlotterComponent.result;
  }


}
