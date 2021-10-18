import { RouterModule, Routes } from '@angular/router';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserSettingsComponent
  }
];

export const UserRoutingModule = RouterModule.forChild(routes);
