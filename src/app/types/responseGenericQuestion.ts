import { Option } from "../models/option";
export interface responseGenericQuestion {
  status: number;
  result: any;
  [key: string]: any;
  name: string;
  questionType: string;
  questionId: number;
  question: string;
  image: string | null;
  options: Option[];

}
