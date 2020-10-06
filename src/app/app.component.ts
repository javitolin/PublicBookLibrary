import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserMessageService } from './user-message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'public-library';
  subscription: Subscription;
  alert_message: String;
  alert_success: boolean;

  constructor(private userMessageService: UserMessageService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.userMessageService.message.subscribe(res => {
      this.alert_message = res.message;
      this.alert_success = res.success;
      setTimeout(function () {
        this.alert_message = ''
      }, 5000);
    })
  }


}
