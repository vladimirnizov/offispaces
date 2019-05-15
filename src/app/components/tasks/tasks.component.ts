import { Component, OnInit} from '@angular/core';
import {Task} from '../../models/Task.model'
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component'

const data: Array<Task> = [new Task('Banana','descr', 1), 
                           new Task('Ananas','descrip',2), 
                           new Task('apple','des',3)];

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  currentTask : Task;
  tasks: Array<Task>

  constructor(private dialog: MatDialog) { 
    if(localStorage.getItem("dataLocal")==null){
    localStorage.setItem("dataLocal", JSON.stringify(data))
    }
  }

  ngOnInit() {
    this.showAll();
  }


  add() {
    const dislogRef = this.dialog.open(EditDialogComponent, {});
    dislogRef.afterClosed().subscribe((task) => {
        if(task){
        this.tasks.push(task);
        localStorage.setItem("dataLocal", JSON.stringify(this.tasks))
        }
    });
  }

  showAll() {
    this.tasks=new Array<Task>();
    JSON.parse(localStorage.getItem("dataLocal")).forEach(element => {
      this.tasks.push(new Task(element._title, element._description, element._price))
    });
  }

  sortPrice() {
    this.tasks.sort(function(a, b){return a.price-b.price});
  }
  sortName() {
    this.tasks.sort((a,b) => a.title.localeCompare(b.title));
  }

  del(ind:number) {
    this.tasks.splice(ind, 1);
    localStorage.setItem("dataLocal", JSON.stringify(this.tasks))
  }

edit(ind:number){
  const dislogRef = this.dialog.open(EditDialogComponent, {data: this.tasks[ind]});
  dislogRef.afterClosed().subscribe((task) => {
      if(task){
      this.tasks[ind]=task;
      localStorage.setItem("dataLocal", JSON.stringify(this.tasks))
      }
  });

}
  

}
