import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { ResultsService } from '../../services/results.service';
import { ActivatedRoute, Router } from '@angular/router';

enum QuestionsEnum {
  price = 'price',
  use = 'use',
  display = 'display',
  apps = 'apps',
  game = 'game',
  content = 'content',
  greetings = 'greetings',
  final = 'final'
}

const rrssArr = ['rrss1', 'rrss2', 'rrss3'];
const jobArr = ['job1', 'job2', 'job3'];
const videoArr = ['video1', 'video2', 'video3'];

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  initGreetings = false;
  display: number = null;
  price: number = null;
  use: number = null;
  apps: number = null;
  content: number = null;
  multiSelectorApps: number[] = [];
  multiSelectorGames: number[] = [];
  dialogs = [];
  isLoadingShow = false;
  isBtnAppsVisible = true;
  isBtnGameVisible = true;
  stateQuestions = [];

  constructor(
    private questions: QuestionsService,
    private resultSrv: ResultsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
  }

  async initDialog() {
    this.initGreetings = true;
    await this.loadQuestion(QuestionsEnum.greetings);
    await this.loadQuestion(QuestionsEnum.display);
  }

  async handleSelectorDisplay(value: number) {
    this.display = value;
    await this.loadQuestion(QuestionsEnum.price);
    this.stateQuestions.push(['display', this.display]);
  }

  async handleSelectorPrice(value: number) {
    this.price = value;
    await this.loadQuestion(QuestionsEnum.use);
    this.stateQuestions.push(['price', this.price]);
  }

  async handleSelectorUse(value: number) {
    this.use = value;
    await this.loadQuestion(QuestionsEnum.apps);
    this.stateQuestions.push(['use', this.use]);
  }

  /*async handleSelectorApps(value: number) {
    this.apps = value;
    await this.loadQuestion(QuestionsEnum.apps);
  }*/

  async handleSelectorContent(value: number) {
    this.content = value;
    await this.loadQuestion(QuestionsEnum.final);
    this.stateQuestions.push(['content', this.content]);
  }

  async handleSaveMultiSelectorApps() {
    this.isBtnAppsVisible = false;

    let countRRSS = 0;
    rrssArr.map(rrss => {
      // @ts-ignore
      if (this.multiSelectorApps.includes(rrss)) {
        return countRRSS++;
      }
    });
    console.log(countRRSS);
    // @ts-ignore
    if (this.multiSelectorApps.includes('gaming')) {
      await this.loadQuestion(QuestionsEnum.game);
    } else if (countRRSS >= 2) {
      await this.loadQuestion(QuestionsEnum.content);
    } else {
      await this.loadQuestion(QuestionsEnum.final);
    }
    this.stateQuestions.push(['apps', this.multiSelectorApps]);
  }

  async handleSaveMultiSelectorGame() {
    this.isBtnGameVisible = false;
    let countRRSS = 0;
    rrssArr.map(rrss => {
      // @ts-ignore
      if (this.multiSelectorApps.includes(rrss)) {
        return countRRSS++;
      }
    });
    console.log(countRRSS);
    // @ts-ignore
    if (countRRSS >= 2) {
      await this.loadQuestion(QuestionsEnum.content);
    } else {
      await this.loadQuestion(QuestionsEnum.final);
    }
    this.stateQuestions.push(['games', this.multiSelectorGames]);
  }

  handleMultiSelectorApps(value: number) {
    if (this.multiSelectorApps.includes(value)) {
      this.multiSelectorApps.splice(this.multiSelectorApps.indexOf(value), 1);
    } else {
      this.multiSelectorApps.push(value);
    }
  }

  handleMultiSelectorGame(value: number) {
    if (this.multiSelectorGames.includes(value)) {
      this.multiSelectorGames.splice(this.multiSelectorGames.indexOf(value), 1);
    } else {
      this.multiSelectorGames.push(value);
    }
  }

  isActiveApps(value: number): boolean {
    return this.multiSelectorApps.includes(value);
  }

  isActiveGames(value: number): boolean {
    return this.multiSelectorGames.includes(value);
  }

  sendStatus() {
    this.resultSrv.sendStatusQuestions(this.stateQuestions);
    this.router.navigate(['/results'], {relativeTo: this.route});
  }

  getHoursMinutes() {
    // tslint:disable-next-line:new-parens
    const date = new Date;
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  async loadQuestion(questionType) {
    this.isLoadingShow = true;
    const question = await this.questions.getQuestion(questionType);
    this.dialogs = [...this.dialogs, question];
    this.isLoadingShow = false;
  }

}
