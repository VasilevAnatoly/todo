import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { PagingService } from "../../../core/services/paging.service";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styles: [require("./pagination.component.scss").toString()],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  pager: any = {};

  constructor(private pagingService: PagingService) {}

  ngOnInit() {
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.items.currentValue);
    if (
      changes.items.currentValue !== changes.items.previousValue ||
      changes.items.currentValue?.length !== changes.items.previousValue?.length
    ) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    this.pager = this.pagingService.paginate(
      this.items.length,
      page,
      this.pageSize,
      this.maxPages
    );

    var pageOfItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );

    this.changePage.emit(pageOfItems);
  }
}
