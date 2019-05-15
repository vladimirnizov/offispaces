import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Task} from '../../models/Task.model'

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  form: FormGroup;
  
  constructor(private thisDialog: MatDialogRef<EditDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public task: Task) { }

  ngOnInit() {
    this.checkErrors();
  }

  checkErrors(){
    const title = this.task ? this.task.title : '';
    const description = this.task ? this.task.description : '';
    const price = this.task ? this.task.price : 0;
    this.form = new FormGroup({
      'title': new FormControl(title, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'price': new FormControl(price, [Validators.required]),
    });
  }


  save() {
  const task = new Task(this.form.get('title').value, 
                        this.form.get('description').value, 
                        this.form.get('price').value,
                        ) 

  this.thisDialog.close(task);
  }


}