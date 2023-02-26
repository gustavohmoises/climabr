import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { City } from '../../domain/entities/city.model';

@Injectable()
export class HistorySearchCityService {
  historyArray: Array<City> = [];

  constructor(private storage: Storage) { }

  save(city: City) {
    this.historyArray.push(city);
    this.storage.set('historyArray', this.historyArray);
  }

  async get() {
    return await this.storage.get('historyArray');
  }
}
