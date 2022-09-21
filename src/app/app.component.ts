import { NgForm } from '@angular/forms';
import { CarService } from './car.service';
import { Car } from './car';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cars';
  cars: Car[] = [];
  car: Car = { model: '', price: 0 };
  error = '';
  success = '';

  constructor(private carService: CarService) {}
  ngOnInit() {
    this.getCars();
  }
  getCars(): void {
    this.carService.getAll().subscribe({
      next: (data: Car[]) => {
        this.cars = data;
        this.success = 'successful retrieval of the list';
      },
      error: (err) => {
        console.log(err);
        this.error = err;
      },
    });
  }
  addCar(f: NgForm) {
    this.resetAlerts();
    this.carService.store(this.car).subscribe({
      next: (res: Car) => {
        this.cars.push(res);
        this.success = 'Create Successfully';
        f.reset();
      },
      error: (err) => (this.error = err.message),
    });
  }
  updateCar(name: any, price: any, id: any) {
    this.resetAlerts();
    this.carService
      .update({ model: name.value, price: price.value, id: +id })
      .subscribe({
        next: (res) => {
          this.success = 'Updated Successfully';
        },
        error: (err) => (this.error = err),
      });
  }
  deleteCar(id: number) {
    this.resetAlerts();
    this.carService.delete(id).subscribe({
      next: (res) => {
        this.cars = this.cars.filter(function (item) {
          return item['id'] && +item['id'] !== +id;
        });
        this.success = 'Deleted successfully';
      },
      error: (err) => (this.error = err),
    });
  }
  resetAlerts() {
    this.error = '';
    this.success = '';
  }
}
