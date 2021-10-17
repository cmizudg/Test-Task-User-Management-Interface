import { PermissionGroup } from "./permission-group.model";
import { Role } from "./role.model";
import { Status } from "./status.model";

export class User {
    id!: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    superAdmin: boolean = false;
    status: Status;
    permissions: PermissionGroup[] = [];

    constructor(firstName: string, lastName: string, email: string, role: Role, status: Status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.status = status;
    }
}