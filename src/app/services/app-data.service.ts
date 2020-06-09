import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppModule } from "../app.module";

@Injectable({
  providedIn: AppModule,
})
export class AppDataService {
  public openTodoModal$ = new Subject<any>();
  public todoItem$ = new Subject<any>();
}
