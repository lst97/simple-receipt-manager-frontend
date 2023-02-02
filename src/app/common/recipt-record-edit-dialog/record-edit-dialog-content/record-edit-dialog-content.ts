import { FormControl } from '@angular/forms';

export function NameValidator(control: FormControl) {
  const nameRegex =
    /^(\(([^)]+)\))?[[:punct:]]?\p{Lu}+(?:[\s'-]?[\p{L}\d]+)+(\(([^)]+)\))*$/;
  const name = control.value;
  if (!nameRegex.test(name)) {
    return { invalidName: true };
  }
  return null;
}
