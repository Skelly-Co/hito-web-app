import { ResetPassword } from '../../../shared/state-management/auth.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthUser } from 'src/app/shared/models/auth-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  forgotPassword(authUser: AuthUser) {
    this.store.dispatch(new ResetPassword(authUser));
  }
}
