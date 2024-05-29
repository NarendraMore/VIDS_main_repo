import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
// import { AppModuleConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  project!: FormGroup;
  data: any;
  constructor(private router: Router, private loginService: AuthService) {
    this.project = new FormGroup({
      username: new FormControl('', Validators.required),
      // password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void { }

  onSave() {
    this.data = this.project.value;
    // if (this.data.username === 'anemoi' && this.data.password === 'anemoi') {
    //   localStorage.setItem('user', this.data.username);
    //   this.router.navigate(['/document/nav/config/role']);
    // } else {
    //   alert('Incorrect Crediantials....!!');
    //   this.project.reset();
    //   this.router.navigate(['/']);
    // }
    // this.loginService.login(this.project.value).subscribe((data) => {
    //   console.log(data, 'data');
    // })
    // console.log('save');

    this.router.navigate(['headers/nav/dashboard'])


  }

  UserLogin(email: any) {



  }
}
