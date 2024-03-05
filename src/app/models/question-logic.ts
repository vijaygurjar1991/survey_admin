import { LogicConditions } from "./logic-conditions";
export class QuestionLogic {
    constructor(
        public id: number = 0,
        public surveyId:number=0,
        public questionId: number = 0,
        public ifId: number = 0,
        public ifExpected: string = '',
        public thanId: number = 0,
        public thanTerm:string ='',
        public thanExpected: string = '',
        public elseId: number = 0,
        public elseTerm:string ='',
        public elseExpected: string = '',
        public sort: number=0,
        public name: string = '',
        public popupText:string='',
        public isEveryTime:boolean=false,
        public timesPeriod:number=0,
        public logicConditions: LogicConditions[] = []
    ) { }
}