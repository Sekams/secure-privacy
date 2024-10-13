import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {
  dataOfficerEmail = environment.DATA_OFFICER_EMAIL;
  effectiveDate = 'October 14, 2024';
  country = environment.COUNTRY;
}
