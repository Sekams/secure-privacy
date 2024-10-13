import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addProduct, loadConsent } from '../../state/products/product.actions';
import { AppState } from '../../state/app.state';
import { Router } from '@angular/router';
import { selectConsent } from '../../state/products/product.selectors';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent implements OnInit {
  title = 'Add Product';
  error = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadConsent());
    this.store.select(selectConsent).subscribe((consent) => {
      if (!consent) {
        this.router.navigate(['/privacy-settings']);
      }
    });
  }

  onSubmit(form: NgForm) {
    const formData = form.value;

    const missingValues = Object.keys(formData).filter((key) => !formData[key]);

    if (missingValues.length) {
      this.error = `${missingValues.join(', ')} missing`;
      return;
    }

    this.store.dispatch(addProduct({ payload: formData }));

    this.router.navigate(['']);
  }
}
