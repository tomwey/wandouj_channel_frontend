import { NgModule } from '@angular/core';
import { FormFieldsComponent } from './form-fields/form-fields';
import { IonicPageModule } from 'ionic-angular';
import { JobItemComponent } from './job-item/job-item';
import { RecentDatesBarComponent } from './recent-dates-bar/recent-dates-bar';
import { FilterBarsComponent } from './filter-bars/filter-bars';
@NgModule({
    declarations: [FormFieldsComponent,
        JobItemComponent,
        FilterBarsComponent,
        RecentDatesBarComponent],
    imports: [IonicPageModule.forChild([FormFieldsComponent])],
    exports: [FormFieldsComponent,
        JobItemComponent,
        FilterBarsComponent,
        RecentDatesBarComponent]
})
export class ComponentsModule { }
