import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username!: string;
  password!: string;
  message!: string;

  constructor(private router: Router, private alertController: AlertController) {}

  login() {
    if (this.username === 'admin' && this.password === 'lccdo') {
      this.router.navigate(['/notepad']);
    }
    else{
      this.presentAlert2();
    }
  }
  
  async presentAlert2(){
    const alert = await this.alertController.create({
      message: 'Wrong Username or Password!',
      buttons: ['OK'],
    });
    
    await alert.present();
  }
}
