import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email = '';
  password = '';
  name = '';
  phone = '';
  role: 'consumer' | 'merchant' = 'consumer';

  stallNumber = '';
  marketLocation = '';

  isRegisterMode = false;

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (!this.isRegisterMode) {
      console.log('Login:', { email: this.email, password: this.password });
    } else if (this.role === 'consumer') {
      console.log('Registro consumidor:', {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone
      });
    } else {
      console.log('Registro comerciante:', {
        email: this.email,
        password: this.password,
        name: this.name,
        phone: this.phone,
        stallNumber: this.stallNumber,
        marketLocation: this.marketLocation
      });
    }
  }
}
