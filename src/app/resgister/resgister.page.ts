import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProfileService } from '../api/profile.service';
import * as _ from 'underscore';
import { debounceTime } from 'rxjs/operators';
import { NetworkService } from '../api/network.service';
import { CommonFunctionsService } from '../api/common-functions.service';




@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.page.html',
  styleUrls: ['./resgister.page.scss'],
})
export class ResgisterPage implements OnInit {
  registerForm: FormGroup
  title = "" // title for this page
  selectedItem; // selected Item from the home page if not new registration
  offline: boolean = false; // Flag for the offline check
  needToEdit: boolean = false; // Flag for the Edit enabled check

  constructor(private fb: FormBuilder, public networkService: NetworkService,
    private nav: NavController, public profile: ProfileService, private route: ActivatedRoute, private commonFunction: CommonFunctionsService) {
    this.checkingForConnection() //checking internet function calling
  }

  editClick() {
    // edit enabling function called
    this.needToEdit = !this.needToEdit;
    this.title = this.needToEdit ? 'Edit Employee UI' : 'Employee Detail UI'
  }
  ngOnInit() {
    // Registrartion form initialyzing 
    this.registerForm = this.fb.group({
      first_name: [{ value: '', disabled: this.offline }, [Validators.required]],
      last_name: [{ value: '', disabled: this.offline }, [Validators.required]],
      gender: [{ value: '', disabled: this.offline }, [Validators.required]],
      dob: [[Validators.required]],
      email: [{ value: '', disabled: this.offline }, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phone: [{ value: '', disabled: this.offline }, [Validators.required]],
      address: [{ value: '', disabled: this.offline }, [Validators.required]],
      status: [{ value: '', disabled: this.offline }, [Validators.required]]
    });

    this.route.queryParams.subscribe(params => {
      this.title = (params["toEdit"] == 'true') ? this.needToEdit ? 'Edit Employee UI' : 'Employee Detail UI' : "Register"; // Checking the Flags and Changing the title
      this.needToEdit = this.title == "Register" ? true : false // to make check edit enable from the registration
      if (params["selectedItemID"]) {
        // if user pass id from the param, displaying the user into based on id 
        let selectedItemID = JSON.parse(params["selectedItemID"])
        console.log("selected ", (selectedItemID))
        let employeeList = this.profile.loadEmployeList()
        this.selectedItem = _.find(employeeList, function (employee) { return employee.id == selectedItemID; });
        this.registerForm.controls['first_name'].setValue(this.selectedItem.first_name)
        this.registerForm.controls['last_name'].setValue(this.selectedItem.last_name)
        this.registerForm.controls['gender'].setValue(this.selectedItem.gender)
        this.registerForm.controls['dob'].setValue(this.selectedItem.dob)
        this.registerForm.controls['email'].setValue(this.selectedItem.email)
        this.registerForm.controls['phone'].setValue(this.selectedItem.phone)
        this.registerForm.controls['address'].setValue(this.selectedItem.address)
        this.registerForm.controls['status'].setValue(this.selectedItem.status)
      }
    })
  }

  checkingForConnection(): void {
    setTimeout(() => {
      console.log("checking for internet connection ", navigator.onLine)
      this.offline = !navigator.onLine
    }, 500)
    let type = this.networkService.getNetworkType()
    console.log("type ", type)
    this.networkService
      .getNetworkStatus()
      .pipe(debounceTime(300))
      .subscribe((connected: boolean) => {
        this.offline = !connected;
        console.log('[Home] offline', this.offline);
      });
  }

  // Registration call
  registerBtn() {
    console.log("form group value ", this.registerForm)
    this.commonFunction.showLoader("Saving...")
    this.profile.addEmployee(this.registerForm.value).then((value) => {
      console.log("Save success ", value)
      if (value._meta.success) {
        this.commonFunction.hideLoader()
        this.nav.pop()
      } else {
        this.commonFunction.presentToast(value._meta.message)
        this.commonFunction.hideLoader()
      }
    }).catch((error) => {
      this.commonFunction.hideLoader()
      this.commonFunction.presentToast("Some thing went wrong")
      console.log("error ", error)
    })
  }

  // Delete Call
  deleteBtn() {
    console.log("delete button called")
    this.commonFunction.showSimpleAlert("Confirm", "Do you want to delete this user", "Yes", () => {
      this.commonFunction.showLoader("Deleting...")
      this.profile.deleteEmployee(this.selectedItem.id).then((value) => {
        console.log("Save success ", value)
        if (value._meta.success) {
          this.commonFunction.hideLoader()
          this.nav.pop()
        } else {
          this.commonFunction.presentToast(value._meta.message)
          this.commonFunction.hideLoader()
        }
      }).catch((error) => {
        this.commonFunction.hideLoader()
        this.commonFunction.presentToast("Some thing went wrong")
        console.log("error ", error)
      })
    }, true)
  }

// Edit Call function
  editBtn() {
    console.log("edit button called ", this.registerForm)
    console.log("form group value ", this.registerForm)
    this.commonFunction.showLoader("Saving...")
    this.profile.editEmployee(this.registerForm.value, this.selectedItem.id).then((value) => {
      console.log("Save success ", value)
      if (value._meta.success) {
        this.commonFunction.hideLoader()
        this.nav.pop()
      } else {
        this.commonFunction.presentToast(value._meta.message)
        this.commonFunction.hideLoader()
      }
    }).catch((error) => {
      this.commonFunction.hideLoader()
      this.commonFunction.presentToast("Some thing went wrong")
      console.log("error ", error)
    })

  }
  saveUser() {

  }

}
