import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = new URL(`${environment.API_URL}/Product`);

  requestOptions = {
    headers: new HttpHeaders({
      [environment.API_KEY_HEADER]: environment.API_KEY,
    }),
  };

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getProducts(search?: string): Observable<Product[]> {
    const getUrl = new URL(this.url.toString());

    if (search) {
      const [name, category] = search.split(',');
      name && getUrl.searchParams.append('name', name);
      category && getUrl.searchParams.append('category', category);
    }

    return this.http.get<Product[]>(getUrl.toString(), this.requestOptions);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      this.url.toString(),
      product,
      this.requestOptions
    );
  }

  deleteProducts(ids: string[]): Observable<void> {
    const deleteUrl = new URL(this.url.toString());

    ids.forEach((id) => deleteUrl.searchParams.append('ids', id));

    return this.http.delete<void>(deleteUrl.toString(), this.requestOptions);
  }

  getConsent(): Observable<boolean> {
    return new Observable((observer) => {
      const saveData = this.localStorageService.getData('saveData');
      observer.next(saveData === 'true');
      observer.complete();
    });
  }

  changeConsent(saveData: boolean): Observable<boolean> {
    return new Observable((observer) => {
      this.localStorageService.saveData('saveData', saveData.toString());
      observer.next(saveData);
      observer.complete();
    });
  }
}
