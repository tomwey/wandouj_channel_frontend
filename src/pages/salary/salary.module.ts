import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalaryPage } from './salary';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SalaryPage),
    ComponentsModule
  ],
})
export class SalaryPageModule { }
