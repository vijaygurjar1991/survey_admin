import { ExpertAidServices } from "./expert-aid-services";

export class ExpertAid {
    public id: number = 0;
    public name: string = '';
    public projectType: string = '';
    public email: string = '';
    public mobile: number = 0;
    public address: string = '';
    public startDate: string = '';
    public endDate: string = '';
    public status: string = '';
    public comments: string = '';
    public centerId: number = 0;
    public centerName: string = '';
    public expertAidServices: ExpertAidServices[] = []

    
}
