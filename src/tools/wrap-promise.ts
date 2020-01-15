import { HttpException } from '@nestjs/common';

export async function wrapPromise(value): Promise<any> {
  return new Promise(resolve => {
    if (!value) {
      throw new HttpException('Error!', 404);
    }
    resolve(value);
  });
}
