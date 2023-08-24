import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { [key: string]: string } = {};

  constructor() {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  private saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  register(username: string, password: string): boolean {
    if (!this.users[username]) {
      this.users[username] = password;
      this.saveUsersToStorage();
      return true;
    }
    return false;
  }

  login(username: string, password: string): boolean {
    const savedPassword = this.users[username];
    if (savedPassword && savedPassword === password) {
      const token = this.generateToken();
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  //сымитируем работу сервера, где должен генерироватся токен
  private generateToken(): string {
    const tokenLength = 32;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
    return token;
  }
}
