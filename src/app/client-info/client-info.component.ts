import {ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of, Subject, switchMap} from 'rxjs';
import {SharedService} from '../shared/shared.service';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Client} from '../../assets/model/client.schema';
import {ClientInfoService} from '../services/client-info.service';
import {AddEditClientInfoDialogComponent} from './add-edit-client-info-dialog/add-edit-client-info-dialog.component';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientInfoComponent implements OnInit, OnDestroy {

  clients$: Observable<Client[]> = of([]);
  refreshClients$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly columns = [`index`, `name`, `surname`, `passport`, `passportDate`, `citizenship`, `actions`];

  constructor(private readonly clientInfoService: ClientInfoService,
              private readonly sharedService: SharedService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) {
  }

  ngOnInit(): void {
    this.clients$ = this.refreshClients$.pipe(
      switchMap(_ => this.clientInfoService.getAll())
    );
  }

  add(): void {
    this.openAddEditClientDialog('Add client');
  }

  update(client: Client): void {
    this.openAddEditClientDialog('Edit client', client);
  }

  //todo т.к. res возвращает массив сервисов, мб можно их не перезагружать?
  delete(client: Client): void {
    this.sharedService.initYesNoDialog(`${client.name} client`)
      .pipe(
        switchMap((res: boolean) =>
          res ? this.clientInfoService.delete(client) : EMPTY
        ),
      ).subscribe((res: Client[]) => this.refreshClients$.next(true));
  }

  openAddEditClientDialog(label: string, client: Client = new Client()) {
    this.dialogService.open<Client>(
      new PolymorpheusComponent(AddEditClientInfoDialogComponent, this.injector),
      {
        label,
        data: client,
        size: `m`,
        dismissible: false
      },
    )
      .pipe(
        switchMap((res: Client) => res ? this.clientInfoService.save(res) : EMPTY)
      )
      .subscribe(() => this.refreshClients$.next(true));
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
