import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { RecentDatesBarComponent } from './recent-dates-bar/recent-dates-bar';
@NgModule({
	declarations: [FormFieldsComponent,
    JobItemComponent,
    RecentDatesBarComponent],
	imports: [IonicPageModule.forChild([FormFieldsComponent])],
	exports: [FormFieldsComponent,
    JobItemComponent,
    RecentDatesBarComponent]
})
export class ComponentsModule { }
