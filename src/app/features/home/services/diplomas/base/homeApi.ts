import { Observable } from "rxjs";
import { DiplomasRes } from "../interfaces/diplomas.interface";
import { Exams } from "../interfaces/exams.interface";
import { Qeustions } from "../interfaces/qeustions.interface";
import { SubmissionReq, SubmissionRes} from "../interfaces/submition.interface";
import { ExamById } from "../interfaces/exam-by-id.interface";
import { DiplomaById } from "../interfaces/diploma-by-id.interface";
import { Result } from "../interfaces/result.interface";
import { ResultById } from "../interfaces/result-by-id.interface";

export abstract class homeApi{
    abstract getDiplomas():Observable<DiplomasRes>;
    abstract getDiplomaById(id:string):Observable<DiplomaById>;
    abstract getExams(id:string):Observable<Exams>;
    abstract getQuestion(id:string):Observable<Qeustions>;
    abstract getExamById(id:string):Observable<ExamById>;
    abstract submission(data:SubmissionReq):Observable<SubmissionRes>;
    abstract submissionById(id:string):Observable<ResultById>
    abstract getResults(id:string):Observable<Result>
}