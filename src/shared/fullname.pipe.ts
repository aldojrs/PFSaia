import { Pipe, PipeTransform } from '@angular/core';

export interface UserPipe {
    firstName: string;
    lastName: string;
}

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: UserPipe, mode?: 'uppercase' | 'lowercase'): string {
    const result = value.firstName + ' ' + value.lastName;

    if (mode === 'uppercase') {
      return result.toUpperCase();
    }

    return result;
  }

}
