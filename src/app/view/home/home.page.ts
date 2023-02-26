import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from '../../domain/entities/city.model';
import { SearchCityService } from '../../domain/services/search-city.service';
import { HistorySearchCityService } from '../../domain/services/history-search-city.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  errorMessage = null;
  cities: City[] = [];
  historySearch: Array<City> = [];

  constructor(
    private readonly cityService: SearchCityService,
    private readonly historySearchCityService: HistorySearchCityService,
    private readonly router: Router
  ) {
    this.onInit();
  }

  async onInit() {
    this.historySearch = await this.historySearchCityService.get();
  }

  async onSearch(query: string) {
    try {
      this.errorMessage = null;
      this.cities = await this.cityService.searchByName(query)
    } catch (error) {
      this.errorMessage = error.message
    }
  }

  async onSelect(city: City) {
    await this.router.navigateByUrl(`/weather/${city.id}`, { replaceUrl: true })
  }

}
