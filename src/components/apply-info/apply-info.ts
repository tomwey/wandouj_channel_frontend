import { Component, Input } from '@angular/core';

/**
 * Generated class for the ApplyInfoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'apply-info',
  templateUrl: 'apply-info.html'
})
export class ApplyInfoComponent {

  @Input() item: any = {};

  constructor() {
  }

}
