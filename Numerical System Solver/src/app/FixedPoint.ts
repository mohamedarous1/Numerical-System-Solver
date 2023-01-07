import { create, all } from 'mathjs'


const config = { }
const math = create(all, config)

export class FixedPoint
{
  fx:string = "";
  gx:string = "";
  initial:number = 0;
  percision:number = 0;
  steps:string[] = [];
  iterations:number = 0;
  tolerance:number = 0;


  constructor(fx:string, gx:string, initial:number, iterations:number, tolerance:number, percision:number)
  {
    this.fx = fx;
    this.gx = gx;
    this.initial = initial;
    this.iterations = iterations;
    this.tolerance = tolerance;
    this.percision = percision;


    let old = performance.now();
    this.MainFunction();

    let date=performance.now();
    let n2 =date-old;

    this.AddToSteps("Time is " + n2 + " millisecond");
  }

  MainFunction()
  {
    let x = this.initial;

    for (let i = 0; i < this.iterations; i++)
    {
      let oldx = x;
      x = this.GetNext(x);
      let error = this.GetError(oldx, x);

      this.MakeStep(x, error);
    }
    console.log("answer = " + x);
  }

  GetNext(current:number):number
  {
    let next = this.evaluateGx(current);
    return next;
  }

  evaluateFx(point:number): number
  {
    return this.evaluate(this.fx, point);
  }
  evaluateGx(point:number): number
  {
    return this.evaluate(this.gx, point);
  }

  evaluate(func:string, point:number): number
  {
    let value = math.evaluate(func, {x:point});
    value = this.per(value);
    return value;
  }

  GetError(oldx:number, x:number)
  {
    let ans = this.per(Math.abs(x - oldx));
    return ans;
  }

  MakeStep(mid:number, error:number)
  {
    let ans:string = "x = " + mid + " and error = " + error;
    this.AddToSteps(ans);
  }

  AddToSteps(str:string)
  {
    this.steps.push(str);
  }

  per(n:number)
  {
    n = Number(n.toPrecision(this.percision));
    return n;
  }
}
