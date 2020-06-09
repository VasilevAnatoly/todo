import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { OrderPipe } from "ngx-order-pipe";

import { BaseComponent } from "../../modules/shared/components/base/base.component";
import { Todo } from "../../modules/core/models/todo";
import { GlobalTranslateService } from "../../modules/shared/services/global-translate.service";
import { FormGroup, FormControl } from "@angular/forms";
import { AppDataService } from "../../services/app-data.service";
import { takeUntil } from "rxjs/operators";
import { ModalMode } from "../../modules/core/models/ModalMode";
import { TodoService } from "../../modules/core/services/todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styles: [require("./todo-list.component.scss").toString()],
})
export class TodoListComponent extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public todosForm: FormGroup;
  public todos: Array<Todo>;

  public orderingProps: Array<any> = new Array<any>(
    { value: "title", label: "Title" },
    { value: "createdDate", label: "Date created" }
  );
  public currOrderedProp: string = "title";
  public currOrderReverse: boolean = true;

  private destroy$ = new Subject();

  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private dataService: AppDataService,
    private todoService: TodoService,
    private orderPipe: OrderPipe,
    protected globalTranslate: GlobalTranslateService
  ) {
    super(globalTranslate);
  }

  public ngOnInit() {
    this.todosForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      completed: new FormControl(null),
    });

    this.findTodos();
  }

  public ngAfterViewInit() {
    this.getTranslation("TODO_LIST.PAGE_TITLE")
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        title => {
          this.titleService.setTitle(title);
        },
        error => {
          console.error(error);
        }
      );

    this.dataService.todoItem$.pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        if (data.mode === ModalMode.Edit) {
          this.todoService.updateById(data.id, data.changes);
        }

        if (data.mode === ModalMode.Add) {
          const newTodo: Todo = new Todo({
            title: data.changes.title,
            description: data.changes.description,
            completed: false,
            createdDate: new Date(),
          });
          this.todoService.add(newTodo);
        }
      },
      error => {
        console.error(error);
      }
    );
  }

  public selectOrderedProp(propName: string) {
    this.currOrderedProp = propName;
  }

  public changeSortOrder() {
    this.currOrderReverse = !this.currOrderReverse;
  }

  public findTodos() {
    this.todos = this.todoService.getAll({
      title: this.todosForm.controls["title"].value,
      description: this.todosForm.controls["description"].value,
      completed: this.todosForm.controls["completed"].value,
    });
  }

  public addTodo() {
    this.dataService.openTodoModal$.next({
      mode: ModalMode.Add,
    });
  }

  public trackByFn(index, todo: Todo): string {
    return todo.id;
  }

  public onUpdateTodo(id: string) {
    const todo: Todo = this.todoService.getById(id);
    this.dataService.openTodoModal$.next({
      mode: ModalMode.Edit,
      id: todo.id,
      todo: todo,
    });
  }

  public onToggleCompleteTodo(data: any) {
    this.todoService.updateById(data.id, data.changes);
  }

  public onDeleteTodo(id: string) {
    this.todoService.deleteById(id);
  }

  public ngOnDestroy() {
    this.dispose();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
