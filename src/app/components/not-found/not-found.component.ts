import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

import { GlobalTranslateService } from "../../modules/shared/services/global-translate.service";
import { BaseComponent } from "../../modules/shared/components/base/base.component";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styles: [require("./not-found.component.scss").toString()],
})
export class NotFoundComponent extends BaseComponent implements OnInit {
  constructor(
    protected globalTranslate: GlobalTranslateService,
    private titleService: Title
  ) {
    super(globalTranslate);
  }

  public ngOnInit() {
    this.getTranslation("NOT_FOUND.PAGE_TITLE").subscribe(
      title => {
        this.titleService.setTitle(title);
      },
      error => {
        console.error(error);
      }
    );
  }
}
