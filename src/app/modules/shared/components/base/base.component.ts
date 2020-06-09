import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { GlobalTranslateService } from "../../services/global-translate.service";
import { Component } from "@angular/core";

@Component({
  selector: "base-component",
  template: "",
  styles: [],
})
export class BaseComponent {
  private destroyNotifier$ = new Subject();

  constructor(protected globalTranslate: GlobalTranslateService) {}

  public getTranslation(key: string, interpolation?: any): Observable<string> {
    return this.globalTranslate
      .getTranslation(key, interpolation)
      .pipe(takeUntil(this.destroyNotifier$));
  }

  public dispose(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
