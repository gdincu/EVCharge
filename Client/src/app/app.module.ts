import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { StoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AboutModule } from './about/about.module';
import { ContactModule } from './contact/contact.module';
import { AlertifyService } from './shared/services/alertify.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    StoreModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AboutModule,
    ContactModule
  ],
  providers: [
    HttpClientModule,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
