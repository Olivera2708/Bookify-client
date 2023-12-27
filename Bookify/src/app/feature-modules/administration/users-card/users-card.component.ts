import {Component, Input, OnInit} from '@angular/core';
import {User} from "../model/user";
import {AccountService} from "../../account/account.service";

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrl: './users-card.component.css'
})
export class UsersCardComponent implements OnInit {
  @Input()
  user: User = {}
  image: ArrayBuffer | string | null = 'assets/images/user.jpg';

  constructor(private accService: AccountService) {
  }

  ngOnInit(): void {
    if (this.user.imageId != undefined && this.user.imageId > 0) {
      this.accService.getAccountImage(this.user.imageId).subscribe({
        next: (image: Blob) => {
          const reader: FileReader = new FileReader();
          reader.onloadend = () => {
            if(reader.result) {
              this.image = reader.result;
            }
          };
          reader.readAsDataURL(image);
        },
        error: err => {

        }
      });
    }
  }
}
