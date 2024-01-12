import {Component, Input, OnInit} from '@angular/core';
import {Review} from "../model/review";
import {AccountService} from "../../account/account.service";
import {AdministrationService} from "../administration.service";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent implements OnInit {

  @Input()
  review: Review;
  image: string | ArrayBuffer | null = 'assets/images/user.jpg';

  constructor(private accountService: AccountService,
              private adminService: AdministrationService) {
  }

  ngOnInit(): void {
    if (this.review.guest.imageId != undefined && this.review.guest.imageId > 0) {
      this.accountService.getAccountImage(this.review.guest.imageId).subscribe({
        next: (image: Blob) => {
          const reader: FileReader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
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

  accept(): void {

  }

  decline(): void {

  }

}
