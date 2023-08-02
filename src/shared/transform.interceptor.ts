import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcludeFieldsInterceptor implements NestInterceptor {
  constructor(private readonly excludedFields: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        // If the data is an array, we map through each item and exclude the specified fields.
        if (Array.isArray(data)) {
          return data.map(item => this.excludeFields(item));
        }

        // If the data is an object, we directly exclude the specified fields.
        return this.excludeFields(data);
      }),
    );
  }

  private excludeFields(data: any): any {
    for (const field of this.excludedFields) {
      delete data[field];
    }
    return data
  }
}
