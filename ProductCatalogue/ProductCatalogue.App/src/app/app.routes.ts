import { Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HomeComponent } from './components/home/home.component';
import { PrivacySettingsComponent } from './components/privacy-settings/privacy-settings.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'add-product',
    component: AddProductComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'privacy-settings',
    component: PrivacySettingsComponent,
  },
];
