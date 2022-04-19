import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authSrv.userRegistration(this.registrationForm.value).subscribe(
      (res: any) => {
        console.log(res);
        sessionStorage.setItem('token', res['token']);
        this.router.navigateByUrl('/auth/login');
      },
      err => {
        console.log(err);
      }
    )
  }
}
