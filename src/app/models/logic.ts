export class Logic {
    constructor(
        public id: number = 0,
        public questionId: number = 0,
        public ifId: number = 0,
        public ifExpected: string = '',
        public thanId: number = 0,
        public thanExpected: number = 0,
        public elseId: number = 0,
        public elseExpected: number = 0,
        public sort:number=0,
        public name:string=''
    ) { }
}