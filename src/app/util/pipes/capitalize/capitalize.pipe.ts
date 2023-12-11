import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | undefined, ...args: unknown[]): string | undefined {
    if (value !== undefined) {
      return value.replace(value[0], value[0].toUpperCase());
    }

    return undefined;
  }
}
