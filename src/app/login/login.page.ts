import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ProfileService } from '../api/profile.service';
import { CommonFunctionsService } from '../api/common-functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup
  constructor(private fb: FormBuilder, private nav: NavController, private profile: ProfileService, private commonFunction: CommonFunctionsService) { }

  ngOnInit() {
    // initializing login form
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  saveUser() {

  }
  // login call function
  loginBtn() {
    this.commonFunction.showLoader("Please Wait")// Show proccesing popup
    this.profile.user.login(this.loginForm.value.userName, this.loginForm.value.password).then((val) => {
      this.commonFunction.hideLoader()
      this.commonFunction.presentToast("Welcome", 'success') // Show toast success message
      this.nav.navigateRoot('/home')
    }).catch((error) => {
      this.commonFunction.hideLoader()
      this.commonFunction.presentToast(error,'danger') // Show toast error
    })
  }




}
