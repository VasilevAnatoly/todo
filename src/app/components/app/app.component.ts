import { Component, OnDestroy } from "@angular/core";
import { BaseComponent } from "../../modules/shared/components/base/base.component";
import { GlobalTranslateService } from "../../modules/shared/services/global-translate.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styles: [require("./app.component.scss").toString()],
})
export class AppComponent extends BaseComponent implements OnDestroy {
  constructor(protected globalTranslate: GlobalTranslateService) {
    super(globalTranslate);
  }

  public ngOnDestroy() {
    this.dispose();
  }
}
