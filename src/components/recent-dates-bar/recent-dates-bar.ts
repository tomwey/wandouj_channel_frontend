import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the RecentDatesBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'recent-dates-bar',
  templateUrl: 'recent-dates-bar.html'
})
export class RecentDatesBarComponent {

  @Input() datesData: any = [];
  @Output() onSelectDate: EventEmitter<any> = new EventEmitter();

  currentDate: string = null;

  constructor() {

  }

  selectDate(date) {
    if (!(date.has_data)) return;

    if (this.currentDate == date.date) {
      this.currentDate = null;
    } else {
      this.currentDate = date.date;
    }

    this.onSelectDate.emit(this.currentDate);
  }

}
