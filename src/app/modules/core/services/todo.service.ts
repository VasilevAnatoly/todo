import { Injectable } from "@angular/core";
import { Todo } from "../models/todo";
import { StorageService } from "./storage.service";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  private todoListStorageKey: string = "todoItems";
  private todos: Array<Todo>;

  constructor(private storageService: StorageService) {
    this.todos =
      this.storageService.getData(this.todoListStorageKey) || new Array<Todo>();
  }

  public getAll(values: any = {}): Array<Todo> {
    let filteredTodos: Array<Todo> = this.todos;
    if (values.title) {
      filteredTodos = filteredTodos.filter(
        todo =>
          todo.title.toLowerCase().indexOf(values.title.toLowerCase()) !== -1
      );
    }
    if (values.description) {
      filteredTodos = filteredTodos.filter(
        todo =>
          (todo.description || "")
            .toLowerCase()
            .indexOf(values.description.toLowerCase()) !== -1
      );
    }
    if (values.completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed === true);
    }
    return filteredTodos;
  }

  public getById(id: string): Todo {
    return this.todos.find(todo => todo.id === id);
  }

  public add(todo: Todo): void {
    if (!todo.id) {
      todo.id = uuidv4();
    }
    this.todos.push(todo);
    this.saveTodos();
  }

  public updateById(id: string, changes: Object = {}): void {
    const idx: number = this.todos.findIndex(todo => todo.id === id);
    if (idx !== -1) {
      this.todos[idx] = { ...this.todos[idx], ...changes };
      this.saveTodos();
    }
  }

  public deleteById(id: string): void {
    const idx: number = this.todos.findIndex(todo => todo.id === id);
    if (idx !== -1) {
      this.todos.splice(idx, 1);
      this.saveTodos();
    }
  }

  private saveTodos() {
    this.storageService.setData(this.todoListStorageKey, this.todos);
  }
}
