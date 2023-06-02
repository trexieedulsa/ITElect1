import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.page.html',
  styleUrls: ['./notepad.page.scss'],
})
export class NotepadPage implements OnInit, AfterViewInit {
  notes: { text: string; text2:string;}[] = [];
  constructor(private alertController: AlertController, private modalCtrl: ModalController) { }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalController
    });
    modal.present();
  }

  ngOnInit() {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      this.notes = JSON.parse(storedNotes);
    }
  }
  edit(index: number){
    const title = document.getElementById('title') as HTMLInputElement;
    const des = document.getElementById('des') as HTMLInputElement;

    title.title = 'test';
    des.value = 'test des';
    
  }
  addNote() {
    this.alertController
      .create({
        header: 'Title',
        inputs: [
          {
            name: 'noteText',
            type: 'text',
            placeholder: 'Enter Title',
          },
          {
            name: 'description',
            type: 'text',
            placeholder: 'Descriptions',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Save',
            handler: (data) => {
              const newNote = {
                text: data.noteText,
                text2:data.description,
              };
              this.notes.push(newNote);
              this.saveTasksToLocalStorage();
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
    deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.saveTasksToLocalStorage();
  }
  ngAfterViewInit() {
    this.saveTasksToLocalStorage();
  }
  private saveTasksToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
