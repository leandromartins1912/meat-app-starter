import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from './login.service';
import { User } from './user.model'
import { NotificationService } from '../../shared/messages/notifications.service';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string
  
  constructor(private fb: FormBuilder, private loginService: LoginService, private notificationService: NotificationService, private activatedRoute: ActivatedRoute, private route: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/')
    console.log('navigate',this.navigateTo)
  }

  login(){
    this.loginService.login(this.loginForm.value.email,this.loginForm.value.password)
                     .subscribe(user => 
                                        this.notificationService.notify(`Bem vindo ${user.name}`), 
                                response => 
                                        this.notificationService.notify(response.error.message), 
                                        ()=> this.route.navigate([atob(this.navigateTo)]))
      
  }

}
