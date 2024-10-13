import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addProduct,
  addProductSuccess,
  addProductFailure,
  changeConsent,
  changeConsentSuccess,
  changeConsentFailure,
  loadConsent,
  loadConsentSuccess,
  loadConsentFailure,
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  removeProducts,
  removeProductsSuccess,
  removeProductsFailure,
} from './product.actions';
import { ProductService } from '../../services/product.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Product } from '../../models/product';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap((args: { search: string }) =>
        from(this.productService.getProducts(args.search)).pipe(
          map((products) => loadProductsSuccess({ payload: products })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );

  saveProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((args: { payload: Product }) =>
        from(this.productService.saveProduct(args.payload)).pipe(
          map((product) => addProductSuccess({ payload: product })),
          catchError((error) => of(addProductFailure({ error })))
        )
      )
    )
  );

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProducts),
      switchMap((args: { ids: string[] }) =>
        from(this.productService.deleteProducts(args.ids)).pipe(
          map(() => removeProductsSuccess({ ids: args.ids })),
          catchError((error) => of(removeProductsFailure({ error })))
        )
      )
    )
  );

  loadConsent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadConsent),
      switchMap(() =>
        from(this.productService.getConsent()).pipe(
          map((saveData) => loadConsentSuccess({ saveData })),
          catchError((error) => of(loadConsentFailure({ error })))
        )
      )
    )
  );

  changeConsent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeConsent),
      switchMap((args) =>
        from(this.productService.changeConsent(args.saveData)).pipe(
          map(() => changeConsentSuccess({ saveData: args.saveData })),
          catchError((error) => of(changeConsentFailure({ error })))
        )
      )
    )
  );
}
