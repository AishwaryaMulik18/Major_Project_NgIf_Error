import { Component, OnInit } from '@angular/core';
import {HttpService} from '../quiz/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  correct:number;
  answer:any=[];
  QuizId:number;
  constructor(private service:HttpService,private router:Router,private _Activatedroute:ActivatedRoute) {
    this._Activatedroute.params.subscribe(params=>
      this.QuizId = params.QuizId);
      console.log("Quizid-------"+this.QuizId);
       this.answer=this.router.getCurrentNavigation().extras.state.selectedOption;
   }

  ngOnInit(): void {
    this.service.getQuestions(this.QuizId).subscribe((result)=>{
      this.correct=0;
      // this.answer.forEach((e,i) => {
      //   if(e[i].selectedOption == result[i].Answers)
      //   this.correct++;
      // });
      for(var i=0;i<result.length;i++){
        if(this.answer[i].selectedOption == result[i].Answers)
        this.correct++;
      }
    });
  }

}

