import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  isBackdropVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  showBackdrop(): void{
    this.isBackdropVisible = !this.isBackdropVisible;
  }
  handleCloseModal(){
    this.isBackdropVisible = false;
  }

}
