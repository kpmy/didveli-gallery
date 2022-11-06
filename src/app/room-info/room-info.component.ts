import {ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, of, Subject, switchMap} from 'rxjs';
import {SharedService} from '../shared/shared.service';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {Room} from '../../assets/model/room.schema';
import {RoomInfoService} from '../services/room-info.service';
import {AddEditRoomInfoDialogComponent} from './add-edit-room-info-dialog/add-edit-room-info-dialog.component';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomInfoComponent implements OnInit, OnDestroy {

  rooms$: Observable<Room[]> = of([]);
  refreshRooms$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  destroy$: Subject<boolean> = new Subject<boolean>();
  readonly columns = [`index`, `roomNumber`, `owner`, `actions`];

  constructor(private readonly roomInfoService: RoomInfoService,
              private readonly sharedService: SharedService,
              @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) { }

  ngOnInit(): void {
    this.rooms$ = this.refreshRooms$.pipe(
      switchMap(_ => this.roomInfoService.getAll())
    );
  }

  add(): void {
    this.openAddEditRoomDialog('Add room');
  }

  update(room: Room): void {
    this.openAddEditRoomDialog('Edit room', room);
  }

  openAddEditRoomDialog(label: string, room: Room = new Room()) {
    this.dialogService.open<Room>(
      new PolymorpheusComponent(AddEditRoomInfoDialogComponent, this.injector),
      {
        label,
        data: room,
        size: `m`,
        dismissible: false
      },
    )
      .pipe(
        switchMap((res: Room) => res ? this.roomInfoService.save(res) : EMPTY)
      )
      .subscribe(() => this.refreshRooms$.next(true));
  }

  //todo т.к. res возвращает массив сервисов, мб можно их не перезагружать?
  delete(room: Room): void {
    this.sharedService.initYesNoDialog(`${room.roomNumber} room`)
      .pipe(
        switchMap((res: boolean) =>
          res ? this.roomInfoService.delete(room) : EMPTY
        ),
      ).subscribe((res: Room[]) => this.refreshRooms$.next(true));
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
