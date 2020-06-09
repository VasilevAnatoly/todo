import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { BaseComponent } from "../../modules/shared/components/base/base.component";
import { GlobalTranslateService } from "../../modules/shared/services/global-translate.service";
import { AppDataService } from "../../services/app-data.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalMode } from "../../modules/core/models/ModalMode";

@Component({
  selector: "app-add-edit-todo",
  templateUrl: "./add-edit-todo.component.html",
  styles: [require("./add-edit-todo.component.scss").toString()],
})
export class AddEditTodoComponent extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  public todoForm: FormGroup;
  public mode: ModalMode;
  private todoId: string;

  @ViewChild("closeBtn") public closeBtn: ElementRef;
  @ViewChild("openAddEditTodoModalBtn")
  public openAddEditTodoModalBtn: ElementRef;

  private destroy$ = new Subject();

  constructor(
    private translate: TranslateService,
    private dataService: AppDataService,
    protected globalTranslate: GlobalTranslateService
  ) {
    super(globalTranslate);
  }

  public ngOnInit() {
    this.mode = ModalMode.Add;
    this.todoId = null;
    this.todoForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null),
    });
  }

  public ngAfterViewInit() {
    this.dataService.openTodoModal$.pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.mode = data.mode;

        if (this.mode === ModalMode.Edit) {
          this.todoId = data.todo.id;
          this.todoForm.setValue({
            title: data.todo.title,
            description: data.todo.description,
          });
        }
        if (this.mode === ModalMode.Add) {
          this.todoId = null;
          this.todoForm.setValue({
            title: "",
            description: "",
          });
        }

        this.openAddEditTodoModalBtn.nativeElement.click();
      },
      error => {
        console.error(error);
      }
    );
  }

  public addOrUpdateTodo(): void {
    const changes: any = {};

    Object.keys(this.todoForm.controls).forEach(name => {
      const currentControl = this.todoForm.controls[name];
      if (currentControl.dirty) {
        changes[name] = currentControl.value;
      }
    });

    this.dataService.todoItem$.next({
      id: this.todoId,
      mode: this.mode,
      changes: changes,
    });

    this.closeModal();
  }

  public closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  public ngOnDestroy() {
    this.dispose();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
