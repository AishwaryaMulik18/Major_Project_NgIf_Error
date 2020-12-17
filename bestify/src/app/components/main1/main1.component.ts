import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

declare var jarallax;
@Component({
  selector: 'app-main1',
  templateUrl: './main1.component.html',
  styleUrls: ['./main1.component.scss']
})
export class Main1Component implements OnInit {

  @Input() attemptClick:boolean =false;

  @Output() public notify:EventEmitter<any> = new EventEmitter<any>();
  constructor(private router:Router) { }

  ngOnInit(): void {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
      });
    
  }

  attemptClicked(){
    this.attemptClick=true;
    this.notify.emit(this.attemptClick);

  }
}

