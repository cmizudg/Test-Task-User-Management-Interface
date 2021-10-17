import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { Role } from '../shared/models/role.model';
import { Status } from '../shared/models/status.model';
import { User } from '../shared/models/user.model';

export interface UserData {
  id: number;
  userName: string;
  email: string;
  role: string;
  isActive: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['userName', 'role', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService) { }

  ngOnInit(): void {
     //this.service.addUser( new User('test f', 'test l', 'test@test.tu', Role.User, Status.Active)).subscribe(x=>console.log(x));
     this.service.getUsers().
     subscribe(data  => {
       this.dataSource.data = data.map((x) => {
         let user: UserData = {id: x.id, userName: `${x.firstName} ${x.lastName}`, email: x.email, isActive: x.status == Status.Active, role: Role[x.role]} as UserData;
        return user;
      });
     });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(event: any) {

  }

  deleteUser(event: any) {

  }
}
