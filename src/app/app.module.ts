import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SequenceListComponent } from './sequence-list/sequence-list.component';
import { AuthorizedComponent } from './authorized/authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SequenceListComponent,
    AuthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
