import {ChangeDetectionStrategy, Component, Inject, Injector} from '@angular/core';
import {EMPTY, switchMap} from 'rxjs';
import {TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusComponent} from '@tinkoff/ng-polymorpheus';
import {AddEditCompanyInfoDialogComponent} from './add-edit-company-info-dialog/add-edit-company-info-dialog.component';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyInfoComponent {

  constructor(@Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
              @Inject(Injector) private readonly injector: Injector) { }

  openAddEditCompanyInfoDialog() {
    this.dialogService.open(
      new PolymorpheusComponent(AddEditCompanyInfoDialogComponent, this.injector),
      {
        size: `m`,
        dismissible: false
      },
    )
      .pipe(
        switchMap((res: any) => res ? res : EMPTY)
      )
      .subscribe((res) => console.log(res));
  }

}
