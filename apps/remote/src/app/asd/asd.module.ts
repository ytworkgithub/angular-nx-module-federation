import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsdRoutingModule } from './asd-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, AsdRoutingModule],
})
export class AsdModule {}
