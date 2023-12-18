import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-all-details-page',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    NavbarComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './admin-all-details-page.component.html',
  styleUrl: './admin-all-details-page.component.css'
})
export class AdminAllDetailsPageComponent {
  @Input() title: string = " ";
  @Input() items: any[] = [];
  @Input() is_news: boolean = false;
  @Input() is_user: boolean = false;
  @Input() is_interest: boolean = false;
  @Output() childViewEvent = new EventEmitter<any>();
  @Output() childDeleteEvent = new EventEmitter<any>();
  @Output() ScroolToBottomClicked = new EventEmitter<any>();
  isModalOpen: boolean = false;
  newUser: any;
  userType: string = 'User'
  username: any;
  firstName: any;
  lastName: any;
  email: any;
  password: any;
  publishers: any[] = ["wdjsaijdiadj","djsiaidhjai"];
  selectedPublisher: any;
  i_name: any;

  handleViewClickEvent(article_id:number) {
    this.childViewEvent.emit(article_id);
  }

  handleDeleteClickEvent(article_id:number) {
    this.childDeleteEvent.emit(article_id);
  }

  ScrollToBottom() {
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
  }

  closeModalUser() {
    //this.modalClosedClicked.emit();
    this.isModalOpen = false;
    const modal = document.getElementById('addModalUser');
    if (modal) {
      modal.style.display = 'none';
    }

  }

  addUser() {

  }

  openAddModalUser() {
    //this.modalOpenClicked.emit();
    this.isModalOpen = true;
    const modal = document.getElementById('addModalUser');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openAddModalInterest() {
    this.isModalOpen = true;
    const modal = document.getElementById('addModalInterest');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModalInterest() {
    this.isModalOpen = false;
    const modal = document.getElementById('addModalInterest');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  addInterest() {

  }
}

