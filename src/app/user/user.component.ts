import { Component, OnInit } from '@angular/core';
import { RestService, Account, PlayerStatistics, UserProfile} from '../service/rest-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

public account: any;

  constructor(public rest: RestService) { }

  ngOnInit() {
  console.log("MDF1");
   this.getStats();
  }

    getStats(): void {
    console.log("MDF2");
        this.rest.getAccountStats().subscribe((account: Account) => {
         this.account = account;
         console.log("MDF3");
         console.log(account);
        });
      }
}
