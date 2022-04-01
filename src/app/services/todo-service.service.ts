import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/Todo';
import {take} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  allTodosUrl: string



  constructor(private http: HttpClient) {
    this.allTodosUrl = environment.allTodosUrl
   }


  getTodos() {
  //  return this.http.get<Todo>(this.allTodosUrl)
   return this.http.get<Todo>(this.allTodosUrl)

  }

  getOneTodo() {
    return this.http.get<Todo>(this.allTodosUrl).pipe(take(1))
  }
}
