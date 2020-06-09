import {
  Component,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BaseComponent } from "../../modules/shared/components/base/base.component";
import { Todo } from "../../modules/core/models/todo";
import { GlobalTranslateService } from "../../modules/shared/services/global-translate.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styles: [require("./todo.component.scss").toString()],
})
export class TodoComponent extends BaseComponent implements OnDestroy {
  @Input() public todo: Todo;
  @Output() public updateTodo: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Output() public toggleCompleteTodo: EventEmitter<any> = new EventEmitter<
    any
  >();
  @Output() public deleteTodo: EventEmitter<string> = new EventEmitter<
    string
  >();

  constructor(
    private translate: TranslateService,
    protected globalTranslate: GlobalTranslateService
  ) {
    super(globalTranslate);
  }

  public editTodo() {
    this.updateTodo.next(this.todo.id);
  }

  public changeCompleteTodo() {
    this.toggleCompleteTodo.next({
      id: this.todo.id,
      changes: {
        completed: !this.todo.completed,
      },
    });
  }

  public removeTodo(): void {
    this.deleteTodo.next(this.todo.id);
  }

  public ngOnDestroy() {
    this.dispose();
  }
}
