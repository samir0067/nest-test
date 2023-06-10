import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperAndFusionPipe implements PipeTransform {
  transform(entry: { data: string[] }, metadata: ArgumentMetadata) {
    console.log('metadata =>', metadata);
    console.log('entry =>', entry);
    if (metadata.type === 'body') {
      return entry.data.map((element) => element.toUpperCase()).join('-');
    } else {
      return entry;
    }
  }
}
