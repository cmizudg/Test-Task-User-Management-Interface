import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UserDeleteComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private service: UserService) { }

  ngOnInit(): void {
  }

  onDeleteUser() {
    if (!this.data.id) return;

    this.service.deleteUser(this.data.id)
      .subscribe((res) => this.dialogRef.close(true),
        (error) => this.dialogRef.close(false)
      );
  }
}
