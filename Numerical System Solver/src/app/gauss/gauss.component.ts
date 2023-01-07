import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gauss',
  templateUrl: './gauss.component.html',
  styleUrls: ['./gauss.component.css']
})
export class GaussComponent implements OnInit {

  constructor() {

  }

  Steps:any[][] = [];
  MaxofEachRow:number[] = [];
  Percision:number = 0;

  ngOnInit(): void
  {
  }

  InitializeProgram(a:number[][], b:number[], t:boolean, scaling:ScalingState, Per:number)
  {
    console.log(scaling);
    let Type:OperationType = OperationType.GaussJordan;
    if (t == false)
      Type = OperationType.NormalGauss;

    this.Percision = Per;
    this.InitializeMaxInAllRows(a);

    this.GaussElimination(a, b, Type, scaling);
    return this.Steps;
  }

  GaussElimination(A:number[][], B:number[], Type:OperationType, scaling:ScalingState)
  {
    let n:number = A.length;
    for (let i = 0; i < n; i++)
    {
      this.CheckAndExecuteForReplaceRows(A, B, i, scaling);

      let pivot = A[i][i];
      if (this.CheckNumberEqualZero(pivot))
        continue;

      for (let j = i + 1; j < n; j++)
        this.GaussStep(A, B, i, j);

      if (Type == OperationType.GaussJordan)
        this.NormalizeRow(A, B, i);
    }
    if (this.CheckNoSolution(A, B) || this.CheckInfiniteSolutions(A, B))
      return;
    let Answer:number[] = this.ChooseNormalGaussOrJordan(A, B, Type);
    this.GetAndAddStepToArray("Answer = ", [Answer]);
  }

  ChooseNormalGaussOrJordan(A:number[][], B:number[], Type:OperationType) :number[]
  {
    let Answer = [];
    if (Type === OperationType.NormalGauss)
    {
      Answer = this.CompleteGaussElimination(A, B);
    }
    else
    {
      Answer = this.CompleteGaussJordan(A, B);
    }
    return Answer;
  }

  GaussStep(A:number[][], B:number[], i:number, j:number) : string
  {
    let n:number = A.length;
    let pivot = A[i][i];

    let a = A[j][i] / pivot;
    a = this.per(a);

    let s:string = "Multiply Row " + (i + 1) + " by " + (-a) + " and add it to row " + (j + 1);

    B[j] = B[j] + B[i] * (-a);
    B[j] = this.per(B[j]);

    for (let k = 0; k < n; k++)
    {
      A[j][k] = A[j][k] + A[i][k] * (-a);
      A[j][k] = this.per(A[j][k]);
    }

    this.UpdateMaxInRow(A, j);

    let Augmented:number[][] = this.GetAugmented(A, B);
    this.GetAndAddStepToArray(s, Augmented);

    return s;
  }

  CompleteGaussJordan(A:any, B:any)
  {
    let n:number = A.length;

    for (let i = n - 1; i >= 0; i--)
    {
      let pivot = A[i][i];
      for (let j = i - 1; j >= 0; j--)
        this.GaussStep(A, B, i, j);
    }

    for (let i = 0; i < n; i++)
    {
      B[i] = B[i] / A[i][i];
      B[i] = this.per(B[i]);
    }
    return B;
  }

  CompleteGaussElimination(A:any, B:any)
  {
    let n:number = A.length;
    for (let i = n - 1; i >= 0; i--)
    {
      for (let j = i + 1; j < n; j++)
      {
        B[i] -= A[i][j] * B[j];
        B[i] = this.per(B[i]);
      }
      B[i] /= A[i][i];
      B[i] = this.per(B[i]);
    }

    return B;
  }

  CheckAndExecuteForReplaceRows(A:number[][], B:number[], i:number, scaling:ScalingState)
  {
    let maxRowIndex = this.FindMaxRow(A, i, scaling);
    if (maxRowIndex != i)
    {
      let s1:string = "Replace Rows " + (i + 1) + " and " + (maxRowIndex + 1);

      this.ReplaceRows(A, B, i, maxRowIndex);
      let Augmented:number[][] = this.GetAugmented(A, B);

      this.GetAndAddStepToArray(s1, Augmented);
    }
  }

  NormalizeRow(A:number[][], B:number[], row:number)
  {
    let n:number = A.length;
    let pivot = A[row][row];

    let s:string = "Divide Row " + (row + 1) + " by " + pivot;

    for (let i = 0; i < n; i++)
    {
      A[row][i] /= pivot;
      A[row][i] = this.per(A[row][i]);
    }
    B[row] /= pivot;
    B[row] = this.per(B[row]);

    this.UpdateMaxInRow(A, row);

    let AugmentedAfterNormalize = this.GetAugmented(A, B);

    this.GetAndAddStepToArray(s, AugmentedAfterNormalize);
  }

  FindMaxRow(A:any, row:number, scaling:ScalingState)
  {
    let n:number = A.length;

    let maxi = 0, maxindex = row;

    for (let i = row; i < n; i++)
    {
      if (A[i][row] == 0) continue;

      let ComparingNumber = Math.abs(A[i][row]);

      if (scaling == ScalingState.Scaled)
        ComparingNumber /= this.MaxofEachRow[i];
      ComparingNumber = this.per(ComparingNumber);

      if (ComparingNumber <= maxi) continue;

      maxi = ComparingNumber, maxindex = i;
    }
    return maxindex;
  }

  ReplaceRows(A:any, B:any, row1:number, row2:number)
  {
    [A[row1], A[row2]] = [A[row2], A[row1]];
    [B[row1], B[row2]] = [B[row2], B[row1]];

  }

  GetAndAddStepToArray(op1:any, op2:any)
  {
    let step = [op1, op2];
    this.Steps.push(step);
  }

  GetAndAddStepToArrayOneParameter(op1:any)
  {
    let step = [op1];
    this.Steps.push(step);
  }

  CheckNoSolution(A:number[][], B:number[]) : boolean
  {
    let n:number = A.length;

    for (let i = 0; i < n; i++)
    {
      let AllZeroesInRow = true;

      for (let j = 0; j < n; j++)
        if (this.CheckNumberEqualZero(A[i][j]) == false)
          AllZeroesInRow = false;

      if (AllZeroesInRow == true && this.CheckNumberEqualZero(B[i]) == false)
      {
        this.GetAndAddStepToArrayOneParameter("No Solution");
        return true;
      }
    }
    return false;
  }

  CheckInfiniteSolutions(A:number[][], B:number[]) : boolean
  {
    let n:number = A.length;

    for (let i = 0; i < n; i++)
    {
      let AllZeroesInRow = true;

      for (let j = 0; j < n; j++)
        if (this.CheckNumberEqualZero(A[i][j]) == false)
          AllZeroesInRow = false;

      if (AllZeroesInRow == true && this.CheckNumberEqualZero(B[i]) == true)
      {
        this.GetAndAddStepToArrayOneParameter("Infinite number of solutions");
        return true;
      }
    }
    return false;
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

  InitializeMaxInAllRows(A:number[][])
  {
    let n:number = A.length;

    for (let i = 0; i < n; i++)
      this.UpdateMaxInRow(A, i);
  }

  UpdateMaxInRow(A:number[][], row:number)
  {
    let n:number = A.length;
    let max = 0;
    for (let i = 0; i < n; i++)
      max = Math.max(max, Math.abs(A[row][i]));

    this.MaxofEachRow[row] = max;
  }

  CheckNumberEqualZero(num:number) : boolean
  {
    if (Math.abs(num) < 1e-5) return true;
    else return false;
  }

  per(n:number)
  {
    n = Number(n.toPrecision(this.Percision));
    return n;
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
