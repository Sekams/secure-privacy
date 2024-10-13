import { createReducer, on, Action } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { Product } from '../../models/product';

export type ProductStateStatus = 'pending' | 'loading' | 'error' | 'success';

export interface ProductState {
  saveData: boolean;
  products: Product[];
  status: ProductStateStatus;
  error: string | null;
}

export const initialState: ProductState = {
  saveData: false,
  products: [],
  status: 'pending',
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    status: 'loading' as ProductStateStatus,
  })),
  on(ProductActions.loadProductsSuccess, (state, { payload: products }) => ({
    ...state,
    products,
    status: 'success' as ProductStateStatus,
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as ProductStateStatus,
    error,
  })),
  on(ProductActions.addProduct, (state) => ({
    ...state,
    status: 'loading' as ProductStateStatus,
  })),
  on(ProductActions.addProductSuccess, (state, { payload: product }) => ({
    ...state,
    products: [...state.products, product],
    status: 'success' as ProductStateStatus,
  })),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    status: 'error' as ProductStateStatus,
    error,
  })),
  on(ProductActions.removeProducts, (state) => ({
    ...state,
    status: 'loading' as ProductStateStatus,
  })),
  on(ProductActions.removeProductsSuccess, (state, { ids }) => ({
    ...state,
    products: state.products.filter(
      (product) => product?.id && !ids.includes(product.id)
    ),
    status: 'success' as ProductStateStatus,
  })),
  on(ProductActions.removeProductsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as ProductStateStatus,
    error,
  })),
  on(ProductActions.changeConsent, (state) => ({
    ...state,
    status: 'loading' as ProductStateStatus,
  })),
  on(ProductActions.loadConsent, (state) => ({
    ...state,
    status: 'loading' as ProductStateStatus,
  })),
  on(ProductActions.loadConsentSuccess, (state, { saveData }) => ({
    ...state,
    saveData,
    status: 'success' as ProductStateStatus,
  })),
  on(ProductActions.loadConsentFailure, (state, { error }) => ({
    ...state,
    status: 'error' as ProductStateStatus,
    error,
  })),
  on(ProductActions.changeConsentSuccess, (state, { saveData }) => ({
    ...state,
    saveData,
    status: 'success' as ProductStateStatus,
  })),
  on(ProductActions.changeConsentFailure, (state, { error }) => ({
    ...state,
    status: 'error' as ProductStateStatus,
    error,
  }))
);
