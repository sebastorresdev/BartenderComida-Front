import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  inputValid: boolean = false;

  constructor(private fb: FormBuilder, private _loginServices:LoginService, private router:Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  validarLogin() {
    console.log(this.form.invalid);
    if (!this.form.invalid) {
      console.log('datos ingresados correctamente');
      const data = {usuario: this.form.value.usuario, contrasenia: this.form.value.password};
      this._loginServices.getLogin(data).subscribe((d) => {
        if (d) {
          console.log("incio sesion correctamente")
          this.router.navigate(['pedidos']);
        }
        else {
          alert('Usuario y contraseña incorrecta');
        }
      })
    }
    else {
      this.inputValid = true;
    }
  }
}
