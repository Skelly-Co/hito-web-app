import { CreateAccountDTO } from '../models/dtos/create-account-dto.model';
import { ResetPasswordDTO } from '../models/dtos/reset-password-dto.model';
import { LoginDTO } from '../models/dtos/login-dto.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  createUser(createAccountInput: CreateAccountDTO): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(createAccountInput.email , createAccountInput.password)
      .catch(error => {
        const errorMessage = this.getCreateAccountErrorMessage(error.code);
        throw errorMessage;
    });
  }

  login(loginInput: LoginDTO): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(loginInput.email, loginInput.password)
    .catch(error => {
      const errorMessage = this.getLoginErrorMessage(error.code);
      throw errorMessage;
    });
  }

  logout() {
    return this.angularFireAuth.signOut()
    .catch(error => {
      throw error;
    });
  }

  resetPassword(forgotPasswordInput: ResetPasswordDTO): Promise<void> {
    return this.angularFireAuth.sendPasswordResetEmail(forgotPasswordInput.email)
    .catch(error => {
      const errorMessage = this.getResetPasswordErrorMessage(error.code);
      throw errorMessage;
    });
  }

  getCreateAccountErrorMessage(error: any): string {
    switch (error) {
      case 'auth/email-already-in-use' : {
        return 'Email is already used.';
      }
      case 'auth/network-request-failed' : {
        return 'There has been a connectivity issue.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }

  getLoginErrorMessage(error: any): string {
    switch (error) {
      case 'auth/user-not-found' : {
        return 'User was not found.';
      }
      case 'auth/wrong-password' : {
        return 'Password is invalid.';
      }
      case 'auth/network-request-failed' : {
        return 'There has been a connectivity issue.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }

  getResetPasswordErrorMessage(error: any): string {
    switch (error) {
      case 'auth/user-not-found' : {
        return 'Email was not found.';
      }
      case 'auth/network-request-failed' : {
        return 'There has been a connectivity issue.';
      }
      default: {
        console.log(error);
        return 'There has been an error, try again later.';
      }
    }
  }
}
