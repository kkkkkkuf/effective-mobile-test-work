import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { slideInOut } from '../animations/animation';
import { fade } from '../animations/fade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInOut, fade],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  email: string = '';
  password: string = '';
  isSignInActive: boolean = true;
  isFormValid: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  toggleTabs(isSignIn: boolean) {
    this.isSignInActive = isSignIn;
  }

  get _email() {
    return this.form.get('email') as AbstractControl;
  }

  get _password() {
    return this.form.get('password') as AbstractControl;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.form.valueChanges.subscribe(() => {
      this.isFormValid = this.form.valid;
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;

      if (this.isSignInActive) {
        if (this.authService.login(email, password)) {
          this.toastr.success('Успешный вход');
          this.router.navigate(['posts']);
        } else {
          this.toastr.error('Пользователем с такими данными не найден');
        }
      } else {
        if (this.authService.register(email, password)) {
          this.toastr.success(
            'Теперь вы можете зайти в систему используя свои данные'
          );
          this.isSignInActive = true;
        } else {
          this.toastr.error('Пользователь с таким именем уже существует');
        }
      }
    }
  }
}
