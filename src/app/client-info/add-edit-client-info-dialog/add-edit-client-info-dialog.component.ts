import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import {TuiDialogContext} from '@taiga-ui/core';
import {Client} from '../../../assets/model/client.schema';
import {citizenship} from '../../../assets/data/citizenship';
import {DateHelper} from '../../shared/util/DateHelper';

@Component({
  selector: 'app-add-edit-client-info-dialog',
  templateUrl: './add-edit-client-info-dialog.component.html',
  styleUrls: ['./add-edit-client-info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditClientInfoDialogComponent implements OnInit {

  group: FormGroup = new FormGroup({});
  client: Client = new Client();
  readonly citizenship = citizenship;

  constructor(@Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<Client>) {
  }

  get disabled() {
    return this.group.invalid;
  }

  ngOnInit(): void {
    Object.assign(this.client, this.context.data);
    this.group = new FormGroup({
      name: new FormControl(this.client.name, Validators.required),
      surname: new FormControl(this.client.surname),
      passport: new FormControl(this.client.passport),
      passportDate: new FormControl(DateHelper.tuiDayFromTimestamp(this.client.passportDate)),
      citizenship: new FormControl(this.client.citizenship),
    });
  }

  // todo абстрактный диалоговый класс
  ok() {
    Object.assign(this.client, this.group.value);
    this.client.passportDate = this.client.passportDate.valueOf();
    this.context.completeWith(this.client);
  }

  cancel() {
    this.context.completeWith(null);
  }

}
