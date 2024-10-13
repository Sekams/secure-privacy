import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ProductState } from './product.reducer';

export const selectProductState = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectConsent = createSelector(
  selectProductState,
  (state: ProductState) => state.saveData
);
