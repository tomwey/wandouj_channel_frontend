import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { RecentDatesBarComponent } from './recent-dates-bar/recent-dates-bar';
import { FilterBarsComponent } from './filter-bars/filter-bars';
import { ApplyInfoComponent } from './apply-info/apply-info';
@NgModule({
    declarations: [FormFieldsComponent,
        JobItemComponent,
        FilterBarsComponent,
        ApplyInfoComponent,
        RecentDatesBarComponent],
    imports: [IonicPageModule.forChild([FormFieldsComponent])],
    exports: [FormFieldsComponent,
        JobItemComponent,
        FilterBarsComponent,
        ApplyInfoComponent,
        RecentDatesBarComponent]
})
export class ComponentsModule { }
