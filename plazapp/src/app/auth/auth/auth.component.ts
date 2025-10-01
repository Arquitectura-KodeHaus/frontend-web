import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from '../auth.service';

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
  role: 'consumidor' | 'comerciante' = 'consumidor';

  stallNumber = '';
  marketLocation = '';

  isRegisterMode = false;

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.isRegisterMode) {
      // LOGIN
      this.authService.login(this.email, this.password, this.role).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', this.role);
          this.successMessage = '¡Inicio de sesión exitoso!';
          console.log('Login exitoso ', res);

          // Redirigir según rol
          if (this.role === 'consumidor') {
            window.location.href = '/dashboard-consumidor';
          } else {
            window.location.href = '/dashboard-comerciante';
          }
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Usuario o contraseña incorrectos';
          console.error('Error en login ', err);
        }
      });

    } else if (this.role === 'consumidor') {
      const data = {
        email: this.email,
        password: this.password,
        nombreCompleto: this.name,
        telefono: this.phone
      };

      this.authService.registerConsumidor(data).subscribe({
        next: (res) => {
          this.successMessage = '¡Consumidor registrado correctamente!';
          console.log('Consumidor registrado ', res);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Error registrando consumidor';
          console.error('Error registrando consumidor ', err);
        }
      });

    } else {
      const data = {
        email: this.email,
        password: this.password,
        nombreCompleto: this.name,
        telefono: this.phone,
        numeroPuesto: this.stallNumber,
        ubicacionMercado: this.marketLocation
      };

      this.authService.registerComerciante(data).subscribe({
        next: (res) => {
          this.successMessage = '¡Comerciante registrado correctamente!';
          console.log('Comerciante registrado ', res);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Error registrando comerciante';
          console.error('Error registrando comerciante ', err);
        }
      });
    }
  }
}
