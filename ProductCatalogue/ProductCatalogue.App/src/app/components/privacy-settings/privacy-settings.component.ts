import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  changeConsent,
  loadConsent,
  loadProducts,
  removeProducts,
} from '../../state/products/product.actions';
import {
  selectProducts,
  selectConsent,
} from '../../state/products/product.selectors';
import { Product } from '../../models/product';
import { AppState } from '../../state/app.state';

@Component({
  selector: 'app-privacy-settings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './privacy-settings.component.html',
  styleUrl: './privacy-settings.component.css',
})
export class PrivacySettingsComponent {
  products: Product[] = [];
  title = 'Privacy Settings';
  saveData = new FormControl(false);

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadProducts({ search: '' }));
    this.store
      .select(selectProducts)
      .subscribe((products) => (this.products = products));
    this.store.dispatch(loadConsent());
    this.store
      .select(selectConsent)
      .subscribe((saveData) => this.saveData.setValue(saveData));
  }

  onSaveSettings() {
    const consent = Boolean(this.saveData.value);

    this.store.dispatch(changeConsent({ saveData: consent }));

    if (!consent && this.products?.length > 0) {
      this.store.dispatch(
        removeProducts({
          ids: this.products
            .filter((p) => p.id !== undefined)
            .map((p) => p.id) as string[],
        })
      );
    } else {
      this.router.navigate(['']);
    }
  }
}
