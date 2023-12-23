import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import {FormsModule} from "@angular/forms";
import {user} from "../interfaces";
import { ApiDataService } from '../api-data.service';

@Component({
  selector: 'app-admin-all-details-page',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgIf,
    NavbarComponent,
    FormsModule,
    NgClass,
    NavbarAdminComponent
  ],
  templateUrl: './admin-all-details-page.component.html',
  styleUrl: './admin-all-details-page.component.css'
})
export class AdminAllDetailsPageComponent {
  @Input() title: string = " ";
  @Input() items: any[] = [];
  @Input() users: user[] = [];
  @Input() is_news: boolean = false;
  @Input() is_user: boolean = false;
  @Input() is_interest: boolean = false;
  @Input() is_publisher: boolean = false;
  @Output() childViewEvent = new EventEmitter<any>();
  @Output() childDeleteEvent = new EventEmitter<any>();
  @Output() ScroolToBottomClicked = new EventEmitter<any>();
  @Output() modalAddClicked = new EventEmitter<any>();
  isModalOpen: boolean = false;
  newUser: any;
  userType: string = 'User'
  username: any;
  firstName: any;
  lastName: any;
  email: any;
  author: any;
  password: any;
  publishers: any[] = [];
  selectedPublisher: any;
  i_name: any;
  p_name: any;
  ApiDataService = inject(ApiDataService);
  is_author: boolean = false;

  constructor() {
    this.ApiDataService.getPublishers().then((publishers : any[]) => {
      this.publishers = publishers;
      this.selectedPublisher = publishers[0].id;
      //console.log(publishers);
      //console.log(typeof this.selectedPublisher);
    });
  }


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
    if (this.userType == 'User') {
      this.is_author = false;
    }
    if (this.userType == 'Author') {
      this.is_author = true;
    }
    this.ApiDataService.registerAdmin({email: this.email, password: this.password, username: this.username, firstName: this.firstName, lastName: this.lastName,is_author:this.is_author}).then((response: any) => {
      console.log(response);
      this.closeModalUser();
      this.userType = 'User';
      this.username = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.selectedPublisher = '';
      this.i_name = '';
      this.ScrollToBottom();
      this.modalAddClicked.emit();
    });
    if (this.is_author) {
      this.ApiDataService.getUsers().then((users : any[]) => {
        this.newUser = users[users.length - 1];
        //console.log(this.newUser);
        this.author = {
          user: this.newUser.id,
          publisher: this.selectedPublisher
        }
        this.ApiDataService.createAuthor(this.author).then((response: any) => {
          //console.log(response);
        });
      });
    }

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
    this.ApiDataService.createInterest({name: this.i_name}).then((response: any) => {
      console.log(response);
      this.closeModalInterest();
      this.i_name = '';
      this.ScrollToBottom();
      this.modalAddClicked.emit();
    });

  }

  openAddModalPublisher() {
    console.log("open");
    this.isModalOpen = true;
    const modal = document.getElementById('addModalPublisher');
    console.log(modal);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  addPublisher() {
    this.ApiDataService.createPublisher({name: this.p_name}).then((response: any) => {
      console.log(response);
      this.closeModalPublisher();
      this.i_name = '';
      this.ScrollToBottom();
      this.modalAddClicked.emit();
    });

  }

  closeModalPublisher() {
    this.isModalOpen = false;
    const modal = document.getElementById('addModalPublisher');
    if (modal) {
      modal.style.display = 'none';
    }
  }
}

