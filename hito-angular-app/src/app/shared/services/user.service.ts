import { firebaseCollectionsConstants } from './../constants';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }

  createUser(user: User): Promise<any> {
    return this.angularFirestore.collection<User>(firebaseCollectionsConstants.users).add(user);
  }

  getUser(uid: string): Observable<User> {
    return this.angularFirestore.collection(firebaseCollectionsConstants.users).doc<User>(uid).valueChanges();
  }
}
