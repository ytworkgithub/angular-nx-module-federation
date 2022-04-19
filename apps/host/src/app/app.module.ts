import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderWrapperComponent } from './header-wrapper/header-wrapper.component';
import { AppRoutingModule } from './app-routing.module';
// import { AppModule as AppModuleRemote } from 'remote/AppModule';
// import { HeaderComponent } from 'remote/Header';

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HeaderWrapperComponent,
    /* HeaderComponent, */
  ],
  imports: [BrowserModule, AppRoutingModule /* , AppModuleRemote */],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
