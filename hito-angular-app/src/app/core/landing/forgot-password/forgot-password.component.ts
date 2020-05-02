import { ResetPassword } from '../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validationConstants } from 'src/app/shared/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  hasSubmittedForm: boolean;
  emailErrorMessage: string;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  }, { updateOn: 'submit' });

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  forgotPassword(authUser: AuthUser) {
    this.hasSubmittedForm = true;
    this.validateForm();
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(new ResetPassword(authUser));
    }
  }

  validateForm() {
    if (this.forgotPasswordForm.get('email').hasError('required')) {
      this.emailErrorMessage = validationConstants.emailRequired;
    }
    if (this.forgotPasswordForm.get('email').hasError('email')) {
      this.emailErrorMessage = validationConstants.emailEmail;
    }
  }
}
