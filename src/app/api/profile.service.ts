import { Injectable } from '@angular/core';
import { HttpCallsService } from './http-calls.service';
import { EmployeePost } from '../models/employe.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  isUserLoggedIn: boolean;

  constructor(private httpReqest: HttpCallsService) { }

  // initializing the profile
  profileInit(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let response = JSON.parse(localStorage.getItem("userSession"))
      console.log(response)
      this.isUserLoggedIn = response
      resolve(this.isUserLoggedIn)
    })
  }

  // user releated functionalities
  user = {
    login: (userName: string, password: string): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        if (userName === "admin" && password === "admin") {
          resolve(true)
          this.isUserLoggedIn = true
          this.saveUserSession()
        } else {
          reject('Wrong User name or Password')
        }
      })
    },
    logOut: () => {
      localStorage.removeItem('userSession')
    }
  }
  // syncing the user list Promise function
  syncList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpReqest.getEmployeeList().subscribe((responseValue) => {
        console.log("success ", responseValue)
        if (responseValue.result) {
          localStorage.setItem('employeList', JSON.stringify(responseValue.result))
        }
        resolve(responseValue)
      }, (error) => {
        console.log("error while syncing ", error)
        reject(error)
      })
    })
  }

  // add employee function need to pass the object
  addEmployee(empObj: EmployeePost): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpReqest.addEmployee(empObj).subscribe((value) => {
        resolve(value)
      }, (error) => {
        reject(error)
      })
    })
  }

  // delete fucntion with need to pass the employee id
  deleteEmployee(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpReqest.deleteEmployee(id).subscribe((value) => {
        resolve(value)
      }, (error) => {
        reject(error)
      })
    })
  }

  // edit fucntion with need to pass the employee id and employee object
  editEmployee(empObj: EmployeePost, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpReqest.editEmployee(empObj, id).subscribe((value) => {
        resolve(value)
      }, (error) => {
        reject(error)
      })
    })

  }

  // loading employee from local storage
  loadEmployeList() {
    return JSON.parse(localStorage.getItem("employeList"))
  }

  // saving user login session in local storage
  saveUserSession() {
    localStorage.setItem('userSession', JSON.stringify(this.isUserLoggedIn))
  }


}
