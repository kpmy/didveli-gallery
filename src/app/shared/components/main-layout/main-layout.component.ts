import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {

  readonly tabs = [
    {
      name: 'Active room',
      link: 'booking/active',
      icon: 'active-room.svg',
    },
    {
      name: 'Passive room',
      link: 'booking/passive',
      icon: 'passive-room.svg',
    },
    {
      name: 'Client info',
      link: 'clients',
      icon: 'client.svg',
    },
    {
      name: 'Service info',
      link: 'services',
      icon: 'service.svg',
    },
    {
      name: 'Room info',
      link: 'rooms',
      icon: 'room.svg',
    },
    {
      name: 'Company info',
      link: 'company',
      icon: 'company.svg' ,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  buildLink(iconName: string) {
    return `assets/icons/${iconName}`;
  }

}
