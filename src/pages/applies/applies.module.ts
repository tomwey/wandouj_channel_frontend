import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppliesPage } from './applies';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AppliesPage,
  ],
  imports: [
    IonicPageModule.forChild(AppliesPage),
    ComponentsModule,
  ],
})
export class AppliesPageModule { }
