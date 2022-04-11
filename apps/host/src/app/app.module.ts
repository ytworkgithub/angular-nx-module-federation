import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderWrapperComponent } from './header-wrapper/header-wrapper.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, HeaderWrapperComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
