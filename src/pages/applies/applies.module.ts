import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppliesPage } from './applies';
import { ComponentsModule } from '../../components/components.module';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  declarations: [
    AppliesPage,
  ],
  imports: [
    IonicPageModule.forChild(AppliesPage),
    ComponentsModule,
    VirtualScrollerModule
  ],
})
export class AppliesPageModule { }
