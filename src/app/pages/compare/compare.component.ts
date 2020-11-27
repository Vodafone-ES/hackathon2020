import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  terminalsCompare = [];

  constructor(
    private resultSrv: ResultsService
  ) {
  }

  ngOnInit(): void {
    this.terminalsCompare = this.resultSrv.getCompareStatus();
    console.log(this.terminalsCompare);
  }


  urlImage(url){
    return `https://www.vodafone.es${url}`;
  }
}
