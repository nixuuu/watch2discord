import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs';

@Injectable()
export class W2gService {
  constructor(private http: HttpService, private config: ConfigService) {}

  get apiKey() {
    return this.config.get('W2G_TOKEN');
  }

  createRoom(link: string) {
    return this.http
      .post('https://w2g.tv/rooms/create.json', {
        w2g_api_key: this.apiKey,
        share: link,
      })
      .pipe(
        map((response) => {
          return `https://w2g.tv/rooms/${response.data.streamkey}`;
        }),
      );
  }
}
