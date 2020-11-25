import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ResultsComponent } from './pages/results/results.component';
import { CompareComponent } from './pages/compare/compare.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'chat',
    component: ChatsComponent
  },
  {
    path: 'results',
    component: ResultsComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
