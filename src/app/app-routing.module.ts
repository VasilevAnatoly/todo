import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "todos",
        pathMatch: "full",
      },
      {
        path: "todos",
        component: TodoListComponent,
      },
      {
        path: "404",
        component: NotFoundComponent,
      },
      { path: "**", redirectTo: "404" },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
