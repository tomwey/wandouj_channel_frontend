import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatWanPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatWan',
})
export class FormatWanPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == '0') return '0.00';

    if (!value || value == 'NULL') return '--';

    let val = parseFloat(value);
    if (val == 0.0) return '0.00'

    if (val < 10000.0) return val;

    const res = (val / 10000.0).toFixed(2);

    return `${res}`;
  }
}
