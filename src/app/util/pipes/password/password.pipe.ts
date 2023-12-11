import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'password',
})
export class PasswordPipe implements PipeTransform {
  async transform(
    value: string | undefined,
    ...args: unknown[]
  ): Promise<string | undefined> {
    let encoded = '';
    if (value !== undefined) {
      for (let i = 0; i < value.length; i++) {
        encoded += '*';
      }

      return encoded.slice(0, 6);
    }

    return undefined;
  }
}
