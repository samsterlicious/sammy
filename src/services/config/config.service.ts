import { Injectable } from '@angular/core';
import { env } from 'src/config/env';
import { environments } from 'src/config/env.config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any;
  currentEnvironment = env.env;
  environmentConfigs: any = environments;

  constructor() {
    console.log('this.currentEnvironment', this.currentEnvironment);
    this.config = this.environmentConfigs[this.currentEnvironment];
    console.log('configz', this.config);
  }

  public getConfig(key: any) {
    console.log('key', key);
    return this.config[key];
  }
}
