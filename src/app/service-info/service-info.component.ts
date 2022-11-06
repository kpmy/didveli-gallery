import {ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {ServiceInfoService} from '../services/service-info.service';
import {Service} from '../../assets/model/service.schema';
import {BehaviorSubject, EMPTY, map, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {TuiDialogService} from '@taiga-ui/core';
import {SharedService} from '../shared/shared.service';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {AddEditServiceInfoDialogComponent} from './add-edit-service-info-dialog/add-edit-service-info-dialog.component';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceInfoComponent implements OnInit, OnDestroy {

  services$: Observable<Service[]> = of([]);
  refreshServices$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly columns = [`index`, `name`, `price`, `actions`];

  constructor(private readonly serviceInfoService: ServiceInfoService,
              private readonly sharedService: SharedService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) {
  }

  ngOnInit(): void {
    this.services$ = this.refreshServices$.pipe(
      switchMap(_ => this.serviceInfoService.getAll())
    );
  }

  add(): void {
    this.openAddEditServiceDialog('Add service');
  }

  update(service: Service): void {
    this.openAddEditServiceDialog('Edit service', service);
  }

  openAddEditServiceDialog(label: string, service: Service = new Service()) {
    this.dialogService.open<Service>(
      new PolymorpheusComponent(AddEditServiceInfoDialogComponent, this.injector),
      {
        label,
        data: service,
        size: `m`,
        dismissible: false
      },
    )
      .pipe(
        switchMap((res: Service) => res ? this.serviceInfoService.save(res) : EMPTY)
      )
      .subscribe(() => this.refreshServices$.next(true));
  }

  //todo т.к. res возвращает массив сервисов, мб можно их не перезагружать?
  delete(service: Service): void {
    this.sharedService.initYesNoDialog(`${service.name} service`)
      .pipe(
        switchMap((res: boolean) =>
          res ? this.serviceInfoService.delete(service) : EMPTY
        ),
      ).subscribe((res: Service[]) => this.refreshServices$.next(true));
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
