import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Todo } from './models/Todo';
import { TodoServiceService } from './services/todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy{
  title = 'todoApp';
  todos: Todo[] = []
  searchFormbyId:FormGroup
  searchFormbyUserId:FormGroup
  searchFormbyTitle:FormGroup
  idBool: boolean =true
  userIdBool: boolean = false
  titleBool: boolean = false
  idValue: boolean = false
 todoSubcription = new Subscription()


  constructor(private todoService: TodoServiceService, private fb: FormBuilder){
    this.searchFormbyId = this.fb.group({
      id: new FormControl('', [Validators.required])
    })
    this.searchFormbyUserId = this.fb.group({
      userId:new FormControl('', [Validators.required])
    })
    
    this.searchFormbyTitle = this.fb.group({
      title:new FormControl('', [Validators.required])
    })
   
  }

ngOnInit(): void {
  
this.listTodos()

}

listTodos() {
  this.todoService.getTodos().subscribe((data : any) => {
    console.log(data[0])
    
    
    this.todos = data
  })
}
deleteTodo(id:number) {
  console.log(id)
  console.log(this.idValue)
  let todos = this.todos

 this.todos = this.todos.filter(todo => +todo.id !== +id)
  // this.listTodos
}
onSubmitbyId() {
  let formValue = this.searchFormbyId.value
  let id = formValue.id
  console.log(formValue)
  console.log(id)
  // for(let i = 0; i < this.todos.length; i++) {
  //   if(this.todos[i].id !== id) {
  //     this.todos.splice(i,1)
  //   }
  // }

  this.todos = this.todos.filter( todo => +todo.id === +id)
  console.log(this.todos)
}

onSubmitbyUserId(){
  let formValue = this.searchFormbyUserId.value
  let userId = formValue.userId
  console.log(formValue)
  

  this.todos = this.todos.filter( todo => +todo.userId === +userId)
  console.log(this.todos)
}
onSubmitbytitle(){
  let formValue = this.searchFormbyTitle.value
  let title = formValue.title
  console.log(formValue)
 

  this.todos = this.todos.filter( todo => todo.title === title)
  console.log(this.todos)
}

filter1() {
 this.todos=  this.todos.filter(todo => +todo.id < 100)
}
filter2() {
  // this.listTodos()
  this.todos=  this.todos.filter(todo => +todo.id > 100 )

}
filter3() {
  this.todos=  this.todos.filter(todo => +todo.id > 200)

}
ngOnDestroy(): void {
  this.todoSubcription.unsubscribe()
}
}
