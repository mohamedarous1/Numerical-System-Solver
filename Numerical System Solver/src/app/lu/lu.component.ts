import { Component, OnInit } from '@angular/core';
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)


@Component({
  selector: 'app-lu',
  templateUrl: './lu.component.html',
  styleUrls: ['./lu.component.css']
})
export class LuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  doolittle_form(mat : any, n : any , vec :any, p=6)
  {
    let results:string[][] = [];
    var lower = Array(n).fill(0).map(
      x => Array(n).fill(0));
    var upper = Array(n).fill(0).map(
      x => Array(n).fill(0));
    var sol:any[] = new Array(n) ;
    var ans : any = [];
    var index =0;
    var s = Array(n).fill(0);
    if(math.det(mat) == 0){
      ans.push(["No LU composition !!"])
      return ans ;
    }
    for(var i = 0; i < n; i++)
    {

      
      for(var k = i; k < n; k++)
      {

        if(k == i){
          if(i> 0){
            for(var q = i ; q < n ;q++){
              s[q] = upper[i-1][i]*lower[q][i-1];
            }
            console.log("sss" + s)
          }
          let index = i;
          for(var q = i ; q < n ;q++){
            if(math.abs(mat[q][i] - s[q]) > math.abs(mat[index][i] - s[index])){
                index = q;
            }

          }
          if(index != i){
            console.log(i + " " + index )
            console.log(mat[i])
            console.log(mat[index])
            var temp = mat[index]
            mat[index] = mat[i]
            mat[i] = temp
            var temp2 = vec[index]
            vec[index] = vec[i]
            vec[i] = temp2
            var temp3 = lower[index]
            lower[index] = lower[i]
            lower[i] = temp3
          }
        }
        var sum = 0;
        for(var j = 0; j < i; j++)
          sum = this.per(sum + this.per(lower[i][j] * upper[j][k],p), p);

        upper[i][k] = this.per(mat[i][k] - sum, p);
        results.push([]);
        results[index].push ("upper"+"[" + i.toString()+"]"+"[" + k.toString()+"]" +'='+  mat[i][k].toPrecision(p)  + '-' + sum  + " = "+ upper[i][k].toPrecision(p));
        index++;
      
        if (i == k)

        {lower[i][i] = 1;
          results.push([]);
          results[index].push("lower"+"[" + k.toString()+"]"+"[" + i.toString()+"]" + " = "+ 1);
          index++;
        }

        else
        {

          var sum = 0;
          for(var j = 0; j < i; j++)
            sum = this.per(sum + this.per(lower[k][j] * upper[j][i], p), p);

          lower[k][i] = this.per(this.per(mat[k][i] - sum, p) /upper[i][i],p);
          results.push([]);
          results[index].push ( "lower"+"[" + k.toString()+"]"+"[" + i.toString()+"]" + '='+'('+ mat[k][i].toPrecision(p)  + '-' + sum + ')' +'/'+ upper[i][i].toPrecision(p)+" = "+ lower[k][i].toPrecision(p));
          index++;
        }
      

    }
  }


    for(var i = 0; i < n; i++)
    {
      sol[i]=vec[i];
      for(var j=0;j<i;j++)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*lower[i][j], p), p);
      }}
    for(var i = n-1; i >=0; i--)
    {
      for(var j=n-1;j>i;j--)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*upper[i][j], p), p);
      }
      sol[i] = this.per(sol[i]/upper[i][i],p);
    }

    for(let i=0;i<results.length;i++){
      ans.push(results[i]);
    }
    ans.push(["LOWER MATRIX IS: ",lower]);
    ans.push(["UPPER MATRIX IS: ",upper]);
    ans.push(["SOLUTION IS: ",[sol]]);
    console.log(ans);
    return ans;


  }

  court_form(mat : any, n : any ,vec:any ,p=6)
  {
    var lower = Array(n).fill(0).map(
      x => Array(n).fill(0));
    var upper = Array(n).fill(0).map(
      x => Array(n).fill(0));
    var sol:any[] = new Array(n) ;
    var ans : any[] =[];
    var s = Array(n).fill(0);
    var index =0;
    let results:string[][] = [];
    if(math.det(mat) == 0){
      ans.push(["No LU composition !!"])
      return ans ;
    }



    for(var i = 0; i < n; i++)
    {

      
      for(var k = i; k < n; k++)
      {
        if(k == i){
        if(i> 0){
          for(var q = i ; q < n ;q++){
            s[q] = upper[i-1][i]*lower[q][i-1];
          }
          console.log("sss" + s)
        }
        let index = i;
        for(var q = i ; q < n ;q++){
          if(math.abs(mat[q][i] - s[q]) > math.abs(mat[index][i] - s[index])){
              index = q;
          }

        }
        if(index != i){
          console.log(i + " " + index )
          console.log(mat[i])
          console.log(mat[index])
          var temp = mat[index]
          mat[index] = mat[i]
          mat[i] = temp
          var temp2 = vec[index]
          vec[index] = vec[i]
          vec[i] = temp2
          var temp3 = lower[index]
          lower[index] = lower[i]
          lower[i] = temp3
        }
        }
        var sum = 0;
        for(var j = 0; j < i; j++)
          sum = this.per(sum + this.per(lower[k][j] * upper[j][i],p),p);
        lower[k][i] = this.per(mat[k][i] - sum, p);
        results.push([]);
        results[index].push( "lower"+"[" + k.toString()+"]"+"[" + i.toString()+"]" +'='+  mat[k][i].toPrecision(p)  + '-' + sum  + " = "+ lower[k][i].toPrecision(p));
        index++;
      
        if (i == k)
        {
          upper[i][i] = 1;
          results.push([]);
          results[index].push ("upper"+"[" + i.toString()+"]"+"[" + k.toString()+"]" + " = "+ 1);
          index++;
        }
        else
        {
          var sum = 0;
          for(var j = 0; j < i; j++)
            sum = this.per(sum + this.per((lower[i][j] * upper[j][k])/lower[i][i], p), p);
          upper[i][k] = this.per(this.per(mat[i][k] /lower[i][i], p)- sum, p);
          results.push([]);
          results[index].push ( "upper"+"[" + i.toString()+"]"+"[" + k.toString()+"]" + '='+'('+ mat[i][k].toPrecision(p)  + '-' + sum  +'/'+ lower[i][i].toPrecision(p)+ ')'+ '-' + sum+" = "+ upper[i][k].toPrecision(p));
          index++;
        }
      }
    }


    for(var i = 0; i < n; i++)
    { sol[i]=vec[i];
      for(var j=0;j<i;j++)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*lower[i][j], p), p);
      }
      sol[i] = this.per(sol[i]/lower[i][i],p);
    }
    for(var i = n-1; i >=0; i--)
    {
      for(var j=n-1;j>i;j--)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*upper[i][j], p), p);
      }
    }


    for(let i=0;i<results.length;i++){
      ans.push(results[i]);
    }
    ans.push(["LOWER MATRIX IS: ",lower]);
    ans.push(["UPPER MATRIX IS: ",upper]);
    ans.push(["SOLUTION IS: ",[sol]]);
    console.log(ans);
    console.log(math.multiply(lower, upper));
    return ans;

  }

  cholescky(matrix : any, n : any ,vec:any, p =6 ){
    var lower = Array(n).fill(0).map(x => Array(n).fill(0));
    let results:string[][] = [];
    var sol:any[] = new Array(n ) ;
    var ans2 : any[] = [];

    for(var i = 0 ; i < n ;i ++ ){
      for(var j = 0 ; j<n/2 ; j++){
        if(matrix[i][j] != matrix[j][i]){
          ans2.push(["No Cheloscky !!"])
          return ans2 ;
        }
      }
    }
    const ans =   math.eigs(matrix)
    const eigenvalues  = ans.values;
    for(var i = 0 ; i < n; i++ ){
      if( Object.values(eigenvalues)[i]<= 0){
        ans2.push(["No Cheloscky !!"])
        return ans2 ;
      }
    }

    var index = 0;
    for (var i = 0; i < n; i++) {

      for (var j = 0; j <= i; j++) {
        var sum = 0;

        if (j == i) {
          for (var k = 0; k < j; k++)
            sum = this.per ( sum + this.per(Math.pow(lower[j][k],2), p), p);
          lower[j][j] = this.per(Math.sqrt(matrix[j][j] - sum), p);
          results.push([]);
          results[index].push("lower"+"[" + i.toString()+"]"+"[" + j.toString()+"]" + " = sqrt(" + matrix[j][j].toPrecision(p)  + '-' + sum + ')' + " = "+ lower[j][j].toPrecision(p));
          index++;
        }

        else {

          for (var k = 0; k < j; k++)
            sum = this.per(sum + this.per(lower[i][k] * lower[j][k], p), p);
          lower[i][j] = this.per(this.per(matrix[i][j] - sum, p)/ lower[j][j], p);
          results.push([]);
          results[index].push("lower"+"[" + i.toString()+"]"+"[" + j.toString()+"]"+ " = sqrt(" + matrix[j][j].toPrecision(p)  + '-' + sum + ') / ' + lower[j][j].toPrecision(p) + ' = '+  lower[i][j].toPrecision(p)) ;
          index++;
        }
      }
    }
    for(var i = 0; i < n; i++)
    { sol[i]=vec[i];
      for(var j=0;j<i;j++)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*lower[i][j], p), p);
      }
      sol[i] = this.per(sol[i]/lower[i][i],p);}
    for(var i = n-1; i >=0; i--)
    {
      for(var j=n-1;j>i;j--)
      {
        sol[i]=this.per(sol[i] - this.per(sol[j]*lower[j][i], p), p);
      }
      sol[i] = this.per(sol[i]/lower[i][i],p);
    }
    for(let i=0;i<results.length;i++){
      ans2.push(results[i]);
    }
    ans2.push(["LOWER MATRIX IS: ",lower]);
    ans2.push(["UPPER MATRIX IS: ",math.transpose(lower)]);
    ans2.push(["SOLUTION IS: ",[sol]]);
    console.log(ans2);
    return ans2;
  }

  per(num:number,p:number){
    return Number(num.toPrecision(p))
  }



}
