import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Mva10DslAngularModule } from '@vodafone-es/reboot-dsl-mva10-angular';
import { HomeComponent } from './pages/home/home.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ResultsComponent } from './pages/results/results.component';
import { HeaderComponent } from './components/header/header.component';
import { CompareComponent } from './pages/compare/compare.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatsComponent,
    ResultsComponent,
    HeaderComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Mva10DslAngularModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
