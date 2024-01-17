export class LogicConditions {
  constructor(
      public id: number = 0,
      public logicId: number = 0,
      public isAnd: boolean = true,
      public isOr: boolean = true,
      public thquestionIdanId: number = 0
  ) { }
}