// ============= MODULES =============
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// ============= STYLES =============
import "../assets/styles/styles.scss";
// ============= APP MODULES =============
import { AppRoutingModule } from "./app-routing.module";
import { CoreModule } from "./modules/core/core.module";
import { SharedModule } from "./modules/shared/shared.module";
// ============= COMPONENTS =============
import { AppComponent } from "./components/app/app.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
// ============= SERVICES =============
import { MyMissingTranslationHandler } from "./modules/shared/services/missing.translation.handler";
import { AppDataService } from "./services/app-data.service";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { AddEditTodoComponent } from "./components/add-edit-todo/add-edit-todo.component";
import { TodoComponent } from "./components/todo/todo.component";

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};

@NgModule({
  imports: [
    BrowserModule,
    SharedModule.forRoot(),
    CoreModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MyMissingTranslationHandler,
      },
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    TodoListComponent,
    TodoComponent,
    AddEditTodoComponent,
  ],
  providers: [AppDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
