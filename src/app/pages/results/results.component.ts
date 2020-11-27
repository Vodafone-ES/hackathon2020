import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../../services/results.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  terminals = null;
  positionStepsInit = 0;
  isBackdropVisible = false;
  arrCompareTerminals = [];

  constructor(
    private resultsSrv: ResultsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.resultsSrv.getResult().subscribe(data => {
      const termsKeys = Object.keys(data);
      // @ts-ignore
      const idTerminals = Object.keys(data.nombre);
      const terminals = [];
      idTerminals.map((value, idx) => {
        const terminalTemp = [];
        Object.values(data).map((val, itermVal) => {
          Object.entries(val).map(item => {
            if (Number(item[0]) === Number(idTerminals[idx])) {
              terminalTemp.push([termsKeys[itermVal], item[1]]);
            }
          });
        });
        // @ts-ignore
        terminals.push(Object.fromEntries(terminalTemp));
      });
      this.terminals = terminals.sort((a, b) => {
        if (a.match < b.match) {
          return 1;
        }
        if (a.match > b.match) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      console.log(this.terminals);
    });
  }

  showBackdrop(): void {
    this.isBackdropVisible = !this.isBackdropVisible;
  }

  handleCloseModal() {
    this.isBackdropVisible = false;
    this.positionStepsInit++;
    this.outPage(this.positionStepsInit);
  }

  iLike(terminal) {
    this.positionStepsInit++;
    console.log(terminal);
    this.arrCompareTerminals.push(terminal);
    this.outPage(this.positionStepsInit);
  }

  outPage(counter) {
    if (counter === 5) {
      this.resultsSrv.setCompareStatus(this.arrCompareTerminals);
      this.router.navigate(['/compare'], {relativeTo: this.route});
    }
  }

  matchRound(value) {
    return Math.round(value);
  }

  isAltaCapacidad(value) {
    value = Number(value);
    console.log(value);
    if (value <= 32) {
      return 'Media Capacidad';
    }
    if (value > 32 && value <= 64) {
      return 'Buena Capacidad';
    }
    if (value > 64) {
      return 'Alta Capacidad';
    }

  }

  isBuenaCamera(value) {
    value = Number(value);
    console.log(value);
    if (value <= 12) {
      return 'Normal';
    }
    if (value > 12 && value <= 18) {
      return 'Buena';
    }
    if (value > 18) {
      return 'Excelente';
    }
  }
  isBuenaPantalla(value) {
    value = Number(value);
    console.log(value);
    if (value < 5.9) {
      return 'Normal';
    }
    if (value > 6 && value <= 6.5) {
      return 'Buena';
    }
    if (value > 6.5) {
      return 'Excelente';
    }
  }

  urlImage(url){
    return `https://www.vodafone.es${url}`;
  }

}
