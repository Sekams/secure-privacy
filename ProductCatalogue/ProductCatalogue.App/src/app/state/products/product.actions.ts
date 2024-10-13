import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product';

export const changeConsent = createAction(
  '[Privacy Settings Component] Change Consent',
  props<{ saveData: boolean }>()
);

export const loadConsent = createAction(
  '[Privacy Settings Component] Load Consent'
);

export const addProduct = createAction(
  '[Add Product Component] Add Product',
  props<{ payload: Product }>()
);

export const removeProducts = createAction(
  '[Home Component] Remove Product',
  props<{ ids: string[] }>()
);

export const loadProducts = createAction(
  '[Home Component] Load Products',
  props<{ search: string }>()
);

export const loadProductsSuccess = createAction(
  '[Home Component] Load Products Success',
  props<{ payload: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Home Component] Load Products Failure',
  props<{ error: any }>()
);

export const addProductSuccess = createAction(
  '[Add Product Component] Add Product Success',
  props<{ payload: Product }>()
);

export const addProductFailure = createAction(
  '[Add Product Component] Add Product Failure',
  props<{ error: any }>()
);

export const removeProductsSuccess = createAction(
  '[Home Component] Remove Product Success',
  props<{ ids: string[] }>()
);

export const removeProductsFailure = createAction(
  '[Home Component] Remove Product Failure',
  props<{ error: any }>()
);

export const loadConsentSuccess = createAction(
  '[Privacy Settings Component] Load Consent Success',
  props<{ saveData: boolean }>()
);

export const loadConsentFailure = createAction(
  '[Privacy Settings Component] Load Consent Failure',
  props<{ error: any }>()
);

export const changeConsentSuccess = createAction(
  '[Privacy Settings Component] Change Consent Success',
  props<{ saveData: boolean }>()
);

export const changeConsentFailure = createAction(
  '[Privacy Settings Component] Change Consent Failure',
  props<{ error: any }>()
);
