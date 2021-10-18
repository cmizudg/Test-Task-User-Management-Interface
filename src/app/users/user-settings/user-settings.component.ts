import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { Role } from '../../shared/models/role.model';
import { Status } from '../../shared/models/status.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  user!: User;
  isActive!: boolean;

  settingsForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['', Validators.required],
    permissions: this.fb.array([])
  });

  get permissions() {
    return this.settingsForm.get('permissions') as FormArray;
  }

  roles = Role;
  roleSelectList: number[] = Object.keys(this.roles).filter(f => !isNaN(Number(f))).map(x => +x);

  constructor(private route: ActivatedRoute,
              private service: UserService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getUser(+params.get('id')!))
    ).subscribe(data => { 
      this.user = data;
      this.isActive = data.status === Status.Active;
      this.updateForm();
    });
  }


  updateForm() {
    this.settingsForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      role: this.user.role
    });

    this.user.permissions.forEach(group => {
      const groupPermissions = new FormArray([]);
      group.groupPermissions.forEach(permission => {
        groupPermissions.push(this.fb.group({
          name: [permission.name, Validators.required],
          value: [permission.value]
        }));
      })

      this.permissions.push(this.fb.group({
        groupName: [group.groupName, Validators.required],
        groupPermissions: groupPermissions
      }));     
    });
  }

  onStatusChange() {
    this.isActive = !this.isActive; 
    if (this.isActive) {
      this.settingsForm.disable();
    } else {
      this.settingsForm.enable();
    }    
  }

  onChangeToggle(event: any) {
    event.stopPropagation();
  }

  getGroupPermissions(group: any) {
     return group.get('groupPermissions') as FormArray;
  }

  onSaveChanges() {
    // TODO
  }
}
