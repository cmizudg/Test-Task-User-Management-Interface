import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PermissionGroup } from '../../shared/models/permission-group.model';
import { Role } from '../../shared/models/role.model';
import { Status } from '../../shared/models/status.model';
import { User } from '../../shared/models/user.model';

export const defaultPermissions: PermissionGroup[] = [
  { groupName: 'Permission Group 1', groupPermissions: [ 
    { name: 'Permission 11', value: true}, 
    { name: 'Permission 12', value: true},
    { name: 'Permission 13', value: false}, 
    { name: 'Permission 14', value: true}, 
    { name: 'Permission 15', value: true} ] },
  { groupName: 'Permission Group 2', groupPermissions: [
    { name: 'Permission 16', value: false}, 
    { name: 'Permission 17', value: false}
  ] },
  { groupName: 'Permission Group 3', groupPermissions: [
    { name: 'Permission 18', value: false}, 
    { name: 'Permission 19', value: false}
  ] },
];

@Injectable({
  providedIn: 'root'
})
export class DummyDataService implements InMemoryDbService {

  constructor() { }

  createDb() {

    const users: User[] = [
      { id: 1, firstName: 'Samantha',  lastName: 'Standford',email: 'samantha.standford@testtask.com',role: Role.Admin, superAdmin: false, status: Status.Active, permissions: defaultPermissions},
      { id: 2, firstName: 'Danniel',   lastName: 'Blichman', email: 'danniel.blichman@testtask.com',  role: Role.Admin, superAdmin: false, status: Status.Active, permissions: defaultPermissions},
      { id: 3, firstName: 'Margarette',lastName: 'Jones',    email: 'margarette.jones@testtask.com',  role: Role.User,  superAdmin: false, status: Status.Active, permissions: defaultPermissions},
      { id: 4, firstName: 'Bethany',   lastName: 'Doe',      email: 'bethany.doe@testtask.com',       role: Role.User,  superAdmin: false, status: Status.Active, permissions: defaultPermissions},
      { id: 5, firstName: 'Persival',  lastName: 'Blinn',    email: 'persival.blinn@testtask.com',    role: Role.Admin, superAdmin: false, status: Status.Inactive, permissions: defaultPermissions},
      { id: 6, firstName: 'Samuel',    lastName: 'Jackson',  email: 'samuel.jackson@testtask.com',    role: Role.User,  superAdmin: false, status: Status.Active, permissions: defaultPermissions},
      { id: 7, firstName: 'Ivan',      lastName: 'Ivanov',   email: 'ivan.ivanov@testtask.com',       role: Role.Admin, superAdmin: false, status: Status.Inactive, permissions: defaultPermissions}
    ];

    return { users };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
