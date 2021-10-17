import { Permission } from "./permission.model";

export class PermissionGroup {
    groupName!: string;
    groupPermissions: Permission[] = [];
}