import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../shared/models/status.model';
import { UserService } from '../../core/services/user.service';
import { Role } from '../../shared/models/role.model';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.scss']
})
export class UserInviteComponent implements OnInit {
  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    role: ['', Validators.required],
    status: [Status.Inactive, Validators.required]
  });
  
  roles = Role;
  roleSelectList: number[] = Object.keys(this.roles).filter(f => !isNaN(Number(f))).map(x => +x);

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<UserInviteComponent>,
              private service: UserService) { }

  ngOnInit(): void {
  }

  onSendInvitation() {
    if (!this.userForm.valid) return;

    this.service.addUser(this.userForm.value)
      .subscribe((res) => this.dialogRef.close(true),
        (error) => this.dialogRef.close(false)
      );
  }
}
