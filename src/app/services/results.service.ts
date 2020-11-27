import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const rrssArr = ['rrss1', 'rrss2', 'rrss3'];
const jobArr = ['job1', 'job2', 'job3'];
const videoArr = ['video1', 'video2', 'video3'];
const soft = ['candy', 'puzzle'];
const hard = ['fornite', 'lol'];

@Injectable({
  providedIn: 'root'
})

export class ResultsService {

  orderValues = [
    'display', 'price', 'use', 'job', 'rrss', 'content', 'softGaming', 'hardGaming', 'video'
  ];
  sendValues = [];
  compareStatus = [];

  constructor(
    private http: HttpClient
  ) {
  }

  sendStatusQuestions(status) {
    console.log(status);
    this.sendValues.push(status.filter(item => item[0] === 'display')[0][1]);
    this.sendValues.push(status.filter(item => item[0] === 'price')[0][1]);
    this.sendValues.push(status.filter(item => item[0] === 'use')[0][1]);
    status.map(item => {
      if (item[0] === 'apps') {
        let counter = 0;
        console.log(item[1]);
        jobArr.map(val => {
          // @ts-ignore
          if (item[1].includes(val)) {
            counter++;
          }
        });
        this.sendValues.push((counter >= 2) ? 1 : 0);
      }
    });
    status.map(item => {
      if (item[0] === 'apps') {
        let counter = 0;
        console.log(item[1]);
        rrssArr.map(val => {
          // @ts-ignore
          if (item[1].includes(val)) {
            counter++;
          }
        });
        this.sendValues.push((counter >= 2) ? 1 : 0);
      }
    });
    status.map(item => {
      if (item[0] === 'content') {
        this.sendValues.push(item[1]);
      }
    });
    status.map(item => {
      if (item[0] === 'games') {
        let counter = 0;
        console.log(item[1]);
        soft.map(val => {
          // @ts-ignore
          if (item[1].includes(val)) {
            counter++;
          }
        });
        this.sendValues.push((counter >= 2) ? 1 : 0);
      }
    });
    status.map(item => {
      if (item[0] === 'games') {
        let counter = 0;
        console.log(item[1]);
        hard.map(val => {
          // @ts-ignore
          if (item[1].includes(val)) {
            counter++;
          }
        });
        this.sendValues.push((counter >= 2) ? 1 : 0);
      }
    });
    status.map(item => {
      if (item[0] === 'apps') {
        let counter = 0;
        console.log(item[1]);
        videoArr.map(val => {
          // @ts-ignore
          if (item[1].includes(val)) {
            counter++;
          }
        });
        this.sendValues.push((counter >= 2) ? 1 : 0);
      }
    });


    console.log(this.sendValues);

    const body = {status: this.sendValues};
    this.http.post('http://localhost:3000/api/mobile/', body)
      .subscribe(data => {
        console.log(data);
      });
  }

  getResult() {
    return this.http.get('assets/result.json');
  }

  setCompareStatus(compareTerminals) {
    this.compareStatus = compareTerminals;
  }
  getCompareStatus() {
    return this.compareStatus;
  }


}
