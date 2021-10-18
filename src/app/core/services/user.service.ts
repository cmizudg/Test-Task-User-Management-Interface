import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { defaultPermissions } from './dummy-data.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
const usersUrl = 'api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(usersUrl).pipe(
      catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    user.permissions = defaultPermissions;

    return this.http.post<User>(usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(id: number): Observable<User> {
    const url = `${usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
