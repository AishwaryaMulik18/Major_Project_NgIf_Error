import { Component, OnInit,Input,Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import {Quiz } from './quiz.model';
import {HttpService} from './quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'jquery';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  QuizId:any={};
  questionsResult:any;
  questionNo:number=1;
  index:number=0;
  que_ids:any[]=[];
   questions:any=[];
  // questions:Quiz[]=[];
  count:number=0;
   isClicked=false;
   totalQuestions:number=0;
  completionTime: number=0;
   correctAnswersCount:number=0;
  // questionID = 0;
   currentQuestion = 0;
  // questionIndex: number;
   correctAnswer: boolean;
   hasAnswer: boolean;
   disabled: boolean;
   quizIsOver: boolean;
   progressValue: number;
   timeLeft: 0;
   timePerQuestion = 15;
   interval: any;
  elapsedTime: number;
   elapsedTimes = [];

  constructor(private service:HttpService,private router: Router,private route: ActivatedRoute) {
    this.route.params.subscribe(params=>
      this.QuizId = params.QuizId); 
      this.getQuestions(this.QuizId);
}
  ngOnInit(): void {
      this.timeLeft = this.timePerQuestion;
      this.countdown();
  }

  getQuestions(QuizId:number){

    
    this.service.getQuestions(QuizId).subscribe((result)=>{
      this.questions = result;
      this.totalQuestions = this.questions.length;
      this.progressValue = 100 * (this.index+1) / this.totalQuestions;    
      return this.questions;
    });
  }

  navigateToNextQuestion(){
    this.router.navigate(['Quiz/'+this.QuizId+'/question/'+this.index++]);
    this.resetTimer();
    this.increaseProgressValue();
  }

  increaseProgressValue() {
    this.progressValue = parseFloat((100 * (this.index + 1) / this.totalQuestions).toFixed(1));
  }
  getQuestionID() {
    //alert(this.questions[this.index+1].id); 
     return this.questions[this.index+1].id;
  }

  isFinalQuestion(): boolean {
    return this.index === this.totalQuestions;
  }
  calculateTotalElapsedTime(elapsedTimes) {
    return this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  isCorrect(id:number,option:string){
    this.questions[this.index].selectedOption = option;
    if(this.index+1 == this.totalQuestions){
      this.quizIsOver=true;
    clearInterval(this.interval);
    this.router.navigate(['/result/'+this.QuizId],{state:{
      selectedOption:this.questions
    }});
  }
  }

  navigateToResult(){
      clearInterval(this.interval);
      this.router.navigate(['/result/'+this.QuizId],{state:{
        selectedOption:this.questions
      }});
  }

  quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

  private countdown() {
    // alert(this.index);
    if (this.index <= this.totalQuestions) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
           if (this.timeLeft === 0 && !this.isFinalQuestion()) {
            this.navigateToNextQuestion();
           }
           if (this.timeLeft === 0 && this.isFinalQuestion()) {
            clearInterval(this.interval);  
           }
        }
      }, 1000);
    }
  }
  private resetTimer() {
    this.timeLeft = this.timePerQuestion;
  }
}

















