import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeRoutingModule} from './home/home-routing.module';
import {DetailRoutingModule} from './detail/detail-routing.module';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {ServiceInfoComponent} from './service-info/service-info.component';
import {RoomInfoComponent} from './room-info/room-info.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: 'services', component: ServiceInfoComponent},
      {path: 'rooms', component: RoomInfoComponent}
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'}),
    HomeRoutingModule,
    DetailRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
