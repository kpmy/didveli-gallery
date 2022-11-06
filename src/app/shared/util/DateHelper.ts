import {TuiDay} from '@taiga-ui/cdk';

export class DateHelper {
  public static tuiDayFromTimestamp(date: number): TuiDay | null {
    return date ? TuiDay.fromLocalNativeDate(new Date(date)) : null;
  }
}
