import { Component } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProfileService } from '../api/profile.service';
import * as _ from 'underscore';
import { CommonFunctionsService } from '../api/common-functions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchTerm
  result = []

  constructor(private nav: NavController, public profile: ProfileService, private commonFunction: CommonFunctionsService) {}

  // loading all employee data and syncing to the local storage
  loadData() {
    this.result = this.profile.loadEmployeList() ? this.profile.loadEmployeList() : [] // loading from the local storage
    this.profile.syncList().then((value) => {
      this.result = this.profile.loadEmployeList() ? this.profile.loadEmployeList() : []
    }).catch((error) => {
      console.log("Error while syncing the users")
    })
  }

  // searching function for employees 
  triggerSearch(event) {
    console.log("emptySearch ", event)
    // filtering the data by using underscore
    this.result = _.filter(this.profile.loadEmployeList(), function (emloyee) { return emloyee.first_name.toLowerCase().indexOf(event.toLowerCase()) > -1 });
    console.log("search results  ", this.result)

  }
  cancelSearch() {

  }
  emptySearch() {

  }
  ionViewWillEnter() {
    console.log("ionViewWillLoad")
    this.loadData()
  }

  addNew() {
    // setting up the parameters
    let navigationExtras: NavigationExtras = {
      queryParams: {
        toEdit: false
      }
    };
    // navigating to register page with parameters
    this.nav.navigateForward(['resgister'], navigationExtras)
  }

  itemSelected(selected) {
    console.log("selected Item ", selected)
    // setting up the parameters. sending the selected employee item id and toEdit flag as true
    let navigationExtras: NavigationExtras = {
      queryParams: {
        toEdit: true,
        selectedItemID: JSON.stringify(selected.id)
      }
    };
    // navigating to register page with parameters
    this.nav.navigateForward(['resgister'], navigationExtras)
  }

  //  login out call funciton
  logout() {
    this.commonFunction.showSimpleAlert("Confirm", "Do you want to logout", "Yes", () => {
      this.commonFunction.showLoader("Please wait...") // Show proccesing popup
      this.profile.user.logOut()
      this.nav.navigateRoot('/login')
      this.commonFunction.hideLoader()
    }, true)
  }

}
