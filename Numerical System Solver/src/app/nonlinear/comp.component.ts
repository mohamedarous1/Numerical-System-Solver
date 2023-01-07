import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as math from 'mathjs';
import { and, derivative, im, number, sec } from 'mathjs';
import {Bracketing} from "../Bracketing";
import {FixedPoint} from "../FixedPoint";
import {PlotterComponent} from "../plotter/plotter.component";


@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent implements OnInit {
  runTime :number = 0;
  expression1:string="";
  expression2:string ="";
  deravtitve2:string = ""
  initalvalue1:string="0"
  initalvalue2:string="1"
  precision:string="0.00001"
  significant_figure:number = 1
  iterations:string="50"
  solution:string[] = [];
  inputVerify : boolean = false;
  SolType :string =  "0" ;
  input : string = "";

  constructor(private router:Router) {
  }
  ngOnInit(): void {
  }
  solutionTypeList(solType : string)
  {
      this.SolType = solType;
      console.log(this.SolType)
  }

  result()
  {
    this.SolType = (<HTMLInputElement>document.getElementById("selectSolver"))!.value;
    this.significant_figure = parseInt((<HTMLInputElement>document.getElementById("percisions"))!.value);
    this.iterations = (<HTMLInputElement>document.getElementById("iterations"))!.value;
    this.precision = (<HTMLInputElement>document.getElementById("percision"))!.value
    this.initalvalue1 = (<HTMLInputElement>document.getElementById("intial1"))!.value;
    this.initalvalue2 = (<HTMLInputElement>document.getElementById("intial2"))!.value;
    this.input = (<HTMLInputElement>document.getElementById("textinput"))!.value;

    if(this.SolType == "2")
    {
      var temp = this.input.split(", ");
      this.expression1 = temp[0];
      this.expression2 = temp[1];
    }
    else
    {
      this.expression1 = this.input;
    }

    console.log(this.expression1 + " " + this.initalvalue1 + " " + this.iterations + " " + this.precision + " " + this.significant_figure)
    if(this.SolType == "0"){
      PlotterComponent.method="Bisection Method";
      PlotterComponent.expression1=this.expression1;

      let bracketing=new Bracketing(this.significant_figure,this.expression1,true,Number(this.initalvalue1),Number(this.initalvalue2),Number(this.iterations),Number(this.precision));
      this.solution=bracketing.steps;
    }else if(this.SolType == "1"){
      PlotterComponent.method="False Position";

      PlotterComponent.expression1=this.expression1;

      let bracketing=new Bracketing(this.significant_figure,this.expression1,false,Number(this.initalvalue1),Number(this.initalvalue2),Number(this.iterations),Number(this.precision));
      this.solution=bracketing.steps;
    }else if(this.SolType == "2"){
      PlotterComponent.method="Fixed Point";

      PlotterComponent.expression1=this.expression2;
      let fixed =new FixedPoint(this.expression1,this.expression2,Number(this.initalvalue1),Number(this.iterations),Number(this.precision),Number(this.significant_figure));
      this.solution=fixed.steps;
    }else if(this.SolType == "3"){
      PlotterComponent.method="Newton Raphson Method";

      PlotterComponent.expression1=this.expression1;

      this.solution = this.netwon(this.expression1 , parseFloat(this.initalvalue1) , parseInt(this.iterations) , parseFloat(this.precision) , this.significant_figure);
    }else{
      PlotterComponent.method="Secant Method";

      PlotterComponent.expression1=this.expression1;

      this.solution = this.secant(this.expression1 , parseFloat(this.initalvalue1)  , parseFloat(this.initalvalue2) , parseInt(this.iterations) , parseFloat(this.precision) , this.significant_figure);
    }
    console.log(this.solution);
    PlotterComponent._sol=this.solution;
    PlotterComponent.expression1=this.expression1;
    this.router.navigate(["/plotter"]);
  }


  netwon(f:string,intial:number,iteartions:number,epslon:number,p:number)
  {
      let old=performance.now();
      var itr=0;
      var last=0;
      var ans : string[] =[];
      while((itr<iteartions&&math.abs(intial-last)>epslon)||itr==0)
      {
        last=intial;
        var y=this.per(math.evaluate(f,{x:intial}),p);
        var z=this.per(math.derivative(f, 'x').evaluate({x: intial}),p);
        if(z==0)
        {
          ans.push("not good intial values");
          break;
        }
        intial=this.per(this.per(intial,p)-this.per(y,p)/this.per(z,p),p);
        itr=itr+1;
        ans.push(itr.toString()+"- x="+this.per(last,p).toString()+"-"+this.per(y,p).toString()+"/"+this.per(z,p).toString()+"="+this.per(intial,p).toString());
      }
      let date=performance.now();
      let n2 =date-old;
      ans.push("Time is " + n2 + " millisecond");

      return ans;
    }


  secant(f:string,intial1:number,intial2:number,iteartions:number,epslon:number,p:number)
  {
    let old=performance.now();
    var itr=0;
    var ans : string[] =[];
    if(math.evaluate(f,{x:intial1})*math.evaluate(f,{x:intial2})<0)
    {
      while((itr<iteartions&&math.abs(intial2-intial1)>epslon)||itr==0)
      {
        var y=this.per(math.evaluate(f,{x:intial1}),p);
        var z=this.per(math.evaluate(f,{x:intial2}),p);
        if(y==z)
        {
          ans.push("not good intial values");
          break;
        }
        var t=intial2;
        var tt=intial1;
        intial2-=this.per(this.per(z,p)*(this.per(intial1,p)-this.per(intial2,p))/(this.per(y,p)-this.per(z,p)),p);
        intial1=t;
        itr=itr+1;
        ans.push(itr.toString()+"- x="+this.per(t,p).toString()+"-"+this.per(z,p).toString()+"*("+this.per(tt,p).toString()+"-"+this.per(t,p).toString()+")/("+this.per(y,p).toString()+"-"+this.per(z,p).toString()+")="+this.per(intial2,p).toString());
        console.log(intial2);
        if(intial1==intial2)
        {
          break;
        }
      }
    }
    else
    {
     ans.push("not good intial values");
    }

    let date=performance.now();
    let n2 =date-old;
    ans.push("Time is " + n2 + " millisecond");
    return ans;
  }

  per(num:number,p:number)
  {
    return Number(num.toPrecision(p))
  }


}
