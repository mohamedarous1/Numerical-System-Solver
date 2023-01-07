import { Component, OnInit } from '@angular/core';
import {all, create} from "mathjs";
const config = { }
const math = create(all, config)

@Component({
  selector: 'app-seidel',
  templateUrl: './seidel.component.html',
  styleUrls: ['./seidel.component.css']
})
export class SeidelComponent implements OnInit {

  num:number=3;
  results:any=[];
  multi: any[][] = [];
  constructor() {
  }
  ngOnInit() {
    this.results=[];
    this.multi = [];
  }

  Dominant(mat: any, sz: number) {

    let conv = true;
    let t: number[][] = new Array(sz).fill(0).map(() => new Array(sz + 1).fill(0));
    for (let i = 0; i < sz; i++) {
      for (let j = 0; j < sz + 1; j++) {
        t[i][j] = mat[i][j];
      }
    }
    for (let i = 0; i < sz; i++) {
      for (let j = i; j < sz; j++) {
        if (this.is_max(t[j], i, sz)) {
          for (let k = 0; k < sz + 1; k++) {
            let temp = t[i][k];
            t[i][k] = t[j][k];
            t[j][k] = temp;
          }
          break;
        }
      }
    }
    for (let k = 0; k < sz; k++) {
      if (!this.is_max(t[k], k, sz)) {
        conv = false;
      }
    }
    for (let i = 0; i < sz; i++) {
      //  console.log(t[i]);
    }
    // console.log(conv);
    if (conv) {
      return t;
    } else {
      return mat;
    }
  }

  is_max(row: number[], skip: number, sz: number) {
    let sum = 0;
    for (let k = 0; k < sz; k++) {
      if (skip == k) continue;
      sum += Math.abs(row[k]);
    }
    // console.log("Sum Skip");
    // console.log(sum, skip);
    // console.log(Math.abs(row[skip]) >= sum);
    return (Math.abs(row[skip]) >= sum);
  }
  per(num:number,p:number){
    return Number(num.toPrecision(p))
  }
  seidel(mat: any, size: number,b:any ,intial: any, type: number, iteration: number, p=6) {
    let det=0;
    if(math.det(mat)==0){
      det=1;
    }
    var maxError = 0;
    mat=this.GetAugmented(mat,b);
    mat=this.Dominant(mat,size);
    for (let i=0;i<size;i++) {
      if(mat[i][i]==0){
        return [["The Soulution will Diverge due to divide by zero"]];
      }
    }

    var newValues = Array(size).fill(0);
    var converge = false;
    if (1) {
      var error = Array(size, 0);
      for (var iter = 1; iter <= iteration; iter++) {
        this.results[iter - 1] = '';

        for (var i = 0; i < size; i++) {
          var res = this.per(mat[i][size],p);
          this.results[iter - 1] = this.results[iter - 1] + "X" + (i + 1) + " = ( " + res;
          for (var j = 0; j < size; j++) {
            if (i == j) continue;
            if (i < j) {
              res-=this.per(intial[j]*mat[i][j],p);
              res=this.per(res,p);
              if((intial[j]*mat[i][j])>0)
                this.results[iter-1]=this.results[iter-1]+" - "+this.per(intial[j]*mat[i][j],p);
              else if((intial[j]*mat[i][j])<0) this.results[iter-1]=this.results[iter-1]+" + "+-this.per(intial[j]*mat[i][j],p);;
            } else {
              res-=this.per(newValues[j]*mat[i][j],p);
              res=this.per(res,p);
              if((newValues[j]*mat[i][j])>0)
                this.results[iter-1]=this.results[iter-1]+" - "+this.per(newValues[j]*mat[i][j],p);
              else if((newValues[j]*mat[i][j])<0) this.results[iter-1]=this.results[iter-1]+" + "+-this.per(newValues[j]*mat[i][j],p);;
            }
          }
          this.results[iter-1]=this.results[iter-1]+" ) * "+"1/"+this.per(mat[i][i],p);

          res/=this.per(mat[i][i],p);
          res=this.per(res,p);
          newValues[i]=res;

          this.results[iter-1]=this.results[iter-1]+" = "+this.per(res,p);
          if(i<size-1)
            this.results[iter-1]=this.results[iter-1]+",";
        }
        maxError = 0;
        for (var i = 0; i < size; i++) {
          error[i] = Math.abs(newValues[i] - intial[i]) / newValues[i];
          maxError = Math.max(maxError, error[i]);
          var temp = newValues[i];
          newValues[i] = intial[i];
          intial[i] = temp;
        }
        if(maxError<=type){
          converge=true;
          break;
        }
        // console.log(intial);
      }
    }

    if(converge==false){
      this.results[this.results.length]="THE solution Diverge ";

    }else  this.results[this.results.length]="THE solution Converge ";
    if(det==1){
      this.results[this.results.length-1]+=",The determent is zero";
    }
   return this.Trans(this.results);
  }
  GetAugmented(A:number[][], B:number[])
  {
    let n:number = A.length;

    let C:number[][] = [];

    for (let i = 0; i < n; i++)
    {
      C.push([]);
      for (let j = 0; j < n; j++)
        C[i].push(A[i][j]);
      C[i].push(B[i]);
    }
    return C;
  }
  Trans(res: any[]) {
    for (let i = 0; i < res.length; i++) {
      this.multi.push([]);
      if(i<res.length-1)
        this.multi[i].push("This is Iteration " + (i + 1));
      let st = 0;
      for (let j = 0; j < res[i].length; j++) {
        if (res[i][j] == ',') {
          this.multi[i].push(res[i].substring(st, j));
          st = j + 1;
        }
      }
      this.multi[i].push(res[i].substring(st, res[i].length));
    }
    return this.multi;
  }
}
