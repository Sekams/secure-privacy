import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import {
  loadConsent,
  loadProducts,
  removeProducts,
} from '../../state/products/product.actions';
import {
  selectProducts,
  selectConsent,
} from '../../state/products/product.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  saveData: boolean = false;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadConsent());
    this.store.select(selectConsent).subscribe((consent) => {
      this.saveData = consent;

      if (!consent) {
        this.router.navigate(['/privacy-settings']);
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.store.dispatch(loadProducts({ search: params['search'] }));
      this.store
        .select(selectProducts)
        .subscribe((products) => (this.products = products));
    });
  }

  onSubmit(form: NgForm) {
    const search = form.value.search;
    const queryParams = {};

    if (search) {
      Object.assign(queryParams, {
        queryParams: { search: form.value.search },
      });
    }

    this.router.navigate([''], { ...queryParams });
  }

  onDelete(id: string | undefined) {
    if (!id) return;

    this.store.dispatch(removeProducts({ ids: [id] }));
  }
}
