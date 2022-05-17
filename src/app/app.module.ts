import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxVcardModule } from "ngx-vcard";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxVcardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
