import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.page.html',
  styleUrls: ['./notepad.page.scss'],
})
export class NotepadPage implements OnInit, AfterViewInit {
  notes: { text: string; text2:string;}[] = [];
  constructor(private alertController: AlertController, private modalCtrl: ModalController, private navCtrl: NavController) { }

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
 edit(index: number) {
  const note = this.notes[index];
  const value1 = note.text;
  const value2 = note.text2;
  this.alertController
  .create({
    header: 'Edit',
    inputs: [
      {
        name: 'noteText',
        type: 'text',
        placeholder: 'Enter Title',
        value: value1 
      },
      {
        name: 'description',
        type: 'text',
        placeholder: 'Description',
        value: value2 
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
          const editedNote = {
            text: data.noteText,
            text2: data.description,
          };

         
          this.notes[index] = editedNote;

          
          this.saveTasksToLocalStorage();
        },
      },
    ],
  })
  .then((alert) => {
    alert.present();
  });

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
