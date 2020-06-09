import { CommonModule } from "@angular/common";
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from "@angular/core";
import { TodoService } from "./services/todo.service";
import { PagingService } from "./services/paging.service";
import { StorageService } from "./services/storage.service";

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
  declarations: [],
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [TodoService, StorageService, PagingService],
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }
}
