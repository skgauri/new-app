import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onLogin2(event: Event) {
    event.preventDefault(); // Prevent default form submission
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}  
