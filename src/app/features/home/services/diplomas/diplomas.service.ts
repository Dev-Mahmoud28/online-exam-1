import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { homeApi } from './base/homeApi';
import { DiplomasRes } from './interfaces/diplomas.interface';
import { EndPoints } from './enums/homeEndPoints';
import { Exams } from './interfaces/exams.interface';
import { Qeustions } from './interfaces/qeustions.interface';
import { ExamById } from './interfaces/exam-by-id.interface';
import { DiplomaById } from './interfaces/diploma-by-id.interface';
import { Result } from './interfaces/result.interface';
import { SubmissionReq, SubmissionRes } from './interfaces/submition.interface';
import { ResultById } from './interfaces/result-by-id.interface';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService implements homeApi{
  private _httpClient = inject(HttpClient);

  getDiplomas(): Observable<DiplomasRes> {
    return this._httpClient.get<DiplomasRes>(EndPoints.diplomas);
  }

  getDiplomaById(id: string): Observable<DiplomaById> {
   return this._httpClient.get<DiplomaById>(`${EndPoints.diplomas}/${id}`) ;
  }

  getExams(id:string): Observable<Exams> {
    return this._httpClient.get<Exams>(`${EndPoints.exams}?diplomaId=${id}`);
  }

  getExamById(id: string): Observable<ExamById> {
    return this._httpClient.get<ExamById>(`${EndPoints.exams}/${id}`);
  }

  getQuestion(id:string): Observable<Qeustions> {
    return this._httpClient.get<Qeustions>(`${EndPoints.questions}/exam/${id}`);
  }

  submission(data: SubmissionReq): Observable<SubmissionRes> {
    return this._httpClient.post<SubmissionRes>(`${EndPoints.results}`, data);
  }

  getResults(id:string): Observable<Result> {
    return this._httpClient.get<Result>(`${EndPoints.results}?examId=${id}`);
  }

  submissionById(id: string): Observable<ResultById> {
    return this._httpClient.get<ResultById>(`${EndPoints.results}/${id}`);
  }
}
