import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { City } from '../entities/city.model';

@Injectable()
export class HistoricSearchCityService {
  historicStorage: City[] = [];

  constructor(private storage: Storage) { }

  async save(city: City) {
    this.historicStorage = await this.get();
    this.historicStorage.push(city);
    this.storage.set('historicStorage', this.historicStorage);
  }

  async get(order: string = 'asc') {
    let historicStorage: City[] = await this.storage.get('historicStorage');
    if (historicStorage) {
      if (order == 'desc') {
        return historicStorage.reverse();
      } else {
        return historicStorage;
      }
    }
    return [];
  }
}
