import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { UserComponent } from './user/user.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EventComponent } from './event/event-management/event-management.component';


const routes: Routes =[

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

 
  {
path:'dashboard',
component:HomeComponent
  },
  {
    path:'event',
    loadChildren:() =>import('./event/event.module').then(e=>e.EventModule)
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
