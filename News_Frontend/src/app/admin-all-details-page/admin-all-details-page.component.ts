import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-admin-all-details-page',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    NavbarComponent
  ],
  templateUrl: './admin-all-details-page.component.html',
  styleUrl: './admin-all-details-page.component.css'
})
export class AdminAllDetailsPageComponent {
  @Input() title: string = " ";
  @Input() items: any[] = [];
  @Input() is_news: boolean = false;
  @Input() is_user: boolean = false;
  @Output() childViewEvent = new EventEmitter<any>();
  @Output() childDeleteEvent = new EventEmitter<any>();
  @Output() ScroolToBottomClicked = new EventEmitter<any>();

  handleViewClickEvent(article_id:number) {

    this.childViewEvent.emit(article_id);
  }

  handleDeleteClickEvent(article_id:number) {
    this.childDeleteEvent.emit(article_id);
  }

  ScrollToBottomClick() {
    this.ScroolToBottomClicked.emit();
  }

}

