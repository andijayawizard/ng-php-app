import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  records = [];
  // list = 'api.php/records/cars';
  list = 'list.php';
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/${this.list}`).pipe(
      map((res: any) => {
        this.records = res['data'];
        return this.records;
      })
    );
  }
  store(car: Car) {
    return this.http.post(`${this.baseUrl}/store.php`, { data: car }).pipe(
      map((res: any) => {
        return res['data'];
      })
    );
  }
  update(car: Car) {
    return this.http.put(`${this.baseUrl}/update.php`, { data: car });
  }
  delete(id: any) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(`${this.baseUrl}/delete.php`, { params: params });
  }
}
