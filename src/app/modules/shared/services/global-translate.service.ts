import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Observer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GlobalTranslateService {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(["en"]);
    this.translate.setDefaultLang("en");

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en/) ? browserLang : "en");
  }

  getTranslation(key: string, interpolation?: any): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      (interpolation && Object.keys(interpolation).length
        ? this.translate.get(key, interpolation)
        : this.translate.get(key)
      ).subscribe(
        value => {
          observer.next(value);
          observer.complete();
        },
        error => {
          observer.next("<empty>");
          observer.complete();
        }
      );
    });
  }
}
