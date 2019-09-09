import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isArray } from 'util';

export interface PeriodicElement {
  country: string;
  state: string;
  countryCode: string;
  phoneNumber: string;
}

export interface Select {
  value: number;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['country', 'countryCode', 'name', 'phone', 'phoneNumber', 'state'];
  dataSource = [];
  validNumber:number = null;
  region:number = null;
  regions: Select[] = [
    {value: 237, label: '+237 - Cameroon'},
    {value: 251, label: '+251 - Ethiopia'},
    {value: 212, label: '+212 - Morocco'},
    {value: 258, label: '+258 - Mozambique'},
    {value: 256, label: '+256 - Uganda'},
  ];
  valids: Select[] = [
    {value: 0, label: 'Choose'},
    {value: 1, label: 'Yes'},
    {value: 2, label: 'No'},
  ];

  constructor(private http: HttpClient) { }

  changeRegion(region){
    this.region = region;
    this.findData('/region/ddi/'+region+ this.parseValidNumber());
  }

  changeValid(valid){
    this.validNumber = valid;
    if(this.region){
      this.changeRegion(this.region);
      return;
    }
    this.findData(this.parseValidNumber());
  }

  ngOnInit(){
    this.findData(null);    
  }

  private parseValidNumber(){
    return (this.validNumber == 1 ? '/ok' : (this.validNumber == 2 ? '/nok' : ''));
  }

  async findData(endPoint){
    this.http.get('http://localhost:8000/api/v1/customer' + (endPoint ? endPoint : '')).subscribe(result => {
      if(result['status'] != 200) {
        alert('error in find data, try again!');
        return;
      };
      this.dataSource = isArray(result['data']) ? result['data'] : [];
    })
  }
}
