import {ChangeDetectionStrategy, Component, Inject, NgZone, OnInit} from '@angular/core';
import {ServiceInfoService} from '../services/service-info.service';
import {Service} from '../../assets/model/service.schema';
import {BehaviorSubject, EMPTY, map, Observable, of, switchMap} from 'rxjs';
import {TuiAppearance, tuiButtonOptionsProvider, TuiDialogService, TuiSizeL, TuiSizeXS} from '@taiga-ui/core';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      shape: `rounded`,
      appearance: TuiAppearance.Outline,
    }),
  ],
})
export class ServiceInfoComponent implements OnInit {

  serviceList: Service[] = [];


  services$: Observable<Service[]> = of([]);
  refreshServices$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  dropdownOpen = false;
  size: TuiSizeXS | TuiSizeL = `s`;
  readonly columns = [`index`, `name`, `price`, `actions`];

  constructor(private readonly serviceInfoService: ServiceInfoService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.services$ = this.refreshServices$.pipe(
      switchMap(_ => this.serviceInfoService.getServices())
    );
  }

  addItem(): void {
    const service = new Service();
    service.name = 'Service ' + this.serviceList.length;
    service.price = 20;
    this.serviceInfoService.addItem(service).subscribe(() => this.refreshServices$.next(true));
  }

  updateItem(service: Service): void {
    service.name = 'Service updated' + this.serviceList.length;
    service.price = 25;
    this.serviceInfoService.addItem(service).subscribe((services) => (this.serviceList = services));
  }

  deleteService(service: Service): void {
    this.serviceInfoService.deleteItem(service).subscribe(() => this.refreshServices$.next(true));
  }

  selectOption(item: string): void {
    this.dropdownOpen = false;
    this.dialogService.open(`You selected ${item}`).subscribe();
  }

  trackByFn(index, item) {
    return index;
  }

}
