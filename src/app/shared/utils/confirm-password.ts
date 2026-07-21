import { AbstractControl } from "@angular/forms";

export function confirmPassword(group:AbstractControl){
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : {mismatch: true};
  }