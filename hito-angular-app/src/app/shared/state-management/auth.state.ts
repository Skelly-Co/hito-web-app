import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthUser } from '../models/auth-user';
import { CreateUser, Login, ResetPassword } from './auth.action';
import { map, tap } from 'rxjs/operators';

export interface AuthStateModel {
    loggedInUser: AuthUser;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
      loggedInUser: undefined
    }
})

@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Action(CreateUser)
  createUser({getState, patchState}: StateContext<AuthStateModel>, {payload}: CreateUser) {
    this.authService.createUser(payload);
  }

  @Action(Login)
  login({getState, setState}: StateContext<AuthStateModel>, {payload}: Login) {
    return this.authService.login(payload).pipe(map(result => {
      getState().loggedInUser = result;
    }));
  }

  @Action(ResetPassword)
  resetPassword({getState, patchState}: StateContext<AuthStateModel>, {payload}: ResetPassword) {
    this.authService.resetPassword(payload);
  }
}