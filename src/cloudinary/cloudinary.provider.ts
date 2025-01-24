import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './cloud-constant';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (configService: ConfigService): any => {
    return cloudinary.config({
      cloud_name: configService.get<string>('CLD_CLOUD_NAME'),
      api_key: configService.get<string>('CLD_API_KEY'),
      api_secret: configService.get<string>('CLD_API_SECRET'),
    });
  },
  inject: [ConfigService],
};
