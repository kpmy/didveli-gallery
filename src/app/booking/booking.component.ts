import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EMPTY, Subject, switchMap} from 'rxjs';
import {Client} from '../../assets/model/client.schema';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit, OnDestroy {

  mode = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly columns = [`index`, `room`, `guest`, `arrivalDate`, `departureDate`, `owner`, `lessor`,
    `portal`, `bill`, `actions`];

  constructor(private route: ActivatedRoute) { }

  get title() {
    return `${this.mode} room`;
  }

  ngOnInit(): void {
    this.route.url
      .subscribe(params => {
        this.mode = params[0].path;
      });
  }

  add(): void {
    // this.openAddEditClientDialog('Add client');
  }

  update(client: Client): void {
    // this.openAddEditClientDialog('Edit client', client);
  }

  //todo т.к. res возвращает массив сервисов, мб можно их не перезагружать?
  delete(client: Client): void {
    // this.sharedService.initYesNoDialog(`${client.name} client`)
    //   .pipe(
    //     switchMap((res: boolean) =>
    //       res ? this.clientInfoService.delete(client) : EMPTY
    //     ),
    //   ).subscribe((res: Client[]) => this.refreshClients$.next(true));
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
