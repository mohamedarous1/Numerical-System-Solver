import { create, all } from 'mathjs'


const config = { }
const math = create(all, config)

export class Bracketing
{
  fx:string="";
  isbracekting:boolean = true;
  Percision:number = 0;
  low:number = 0;
  high:number = 0;
  iterations:number = 0;
  tolerance:number = 0;

  steps: string[] = [];

  constructor(percision:number, fx:string, isbracketing:boolean, low:number, high:number, iterations:number, tolerance:number)
  {
    this.Percision = percision;

    this.fx = fx;

    this.isbracekting = isbracketing;

    this.low = low, this.high = high;
    this.iterations = iterations;
    this.tolerance = tolerance;


    let old = performance.now();

    this.binsearch();

    let date=performance.now();
    let n2 =date-old;

    this.AddToSteps("Time is " + n2 + " millisecond");
  }

  binsearch()
  {
    if (this.CheckValidStartingBoundary(this.low, this.high) == false)
      return;

    let low = this.low, high = this.high, mid = 0;

    for (let i = 0; i < this.iterations; i++)
    {
      let oldmid = mid;


      let valuemid = this.evaluate(mid);

      let valuelow = this.evaluate(low);
      let valuehigh = this.evaluate(high);

      let vlow = valuelow * valuemid;
      let vhigh = valuehigh * valuemid;

      if (vlow < 0)
        high = mid;
      else
        low = mid;

      mid = this.getmid(low, high);

      let error = this.GetError(oldmid, mid);
      console.log("i am here");
      this.MakeStep(mid, error);
      if (error < this.tolerance)
        break;
    }
  }

  getmid(low:number, high:number):number
  {
    let mid = 0;
    if (this.isbracekting)
    {
      mid = this.per(this.per(low + high) / 2);
    }
    else
    {
      let flow = this.evaluate(low);
      let fhigh = this.evaluate(high);
      mid = this.per( ( this.per(low*fhigh) - this.per(high*flow) )  /  this.per(fhigh - flow) );
    }
    return mid;
  }

  MakeStep(mid:number, error:number)
  {
    let ans:string = "x = " + mid + " and error = " + error;
    this.AddToSteps(ans);
  }

  AddToSteps(str:string)
  {
    console.log(str);
    this.steps.push(str);
  }

  CheckValidStartingBoundary(a:number, b:number)
  {
    let temp = this.evaluate(a) * this.evaluate(b);
    if (temp < 0)
      return true;

    this.AddToSteps("Not Valid Initial Range");
    return false;
  }

  evaluate(point:number): number
  {
    let ans = math.evaluate(this.fx, {x:point});
    ans = this.per(ans);
    return ans;
  }

  GetError(oldx:number, x:number)
  {
    let ans = this.per(Math.abs(x - oldx));
    return ans;
  }

  per(n:number)
  {
    n = Number(n.toPrecision(this.Percision));
    return n;
  }
}
