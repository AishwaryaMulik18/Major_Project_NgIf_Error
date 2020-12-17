import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {


  }
  getTotalQuestions():Observable<any>{
    return this.http.get<any>(`http://localhost:8080/api/questions?QuizId=1`);
  }

  getQuestions(QuizId:number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/questions?QuizId=`+QuizId);
  }
    
}

