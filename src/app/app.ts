import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  task = '';

  darkMode = false;

  editIndex: number | null = null;

  tasks: {
    text: string;
    completed: boolean;
  }[] = [];

  ngOnInit(): void {
    const savedTasks =
      localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    const savedTheme =
      localStorage.getItem('darkMode');

    if (savedTheme) {
      this.darkMode = JSON.parse(savedTheme);
    }
  }

  addTask() {
    if (this.task.trim() !== '') {

      if (this.editIndex !== null) {

        this.tasks[this.editIndex].text =
          this.task;

        this.editIndex = null;

      } else {

        this.tasks.push({
          text: this.task,
          completed: false,
        });

      }

      this.task = '';

      this.saveTasks();
    }
  }

  editTask(index: number) {
    this.task = this.tasks[index].text;

    this.editIndex = index;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);

    this.saveTasks();
  }

  toggleTask(index: number) {
    this.tasks[index].completed =
      !this.tasks[index].completed;

    this.saveTasks();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;

    localStorage.setItem(
      'darkMode',
      JSON.stringify(this.darkMode)
    );
  }

  saveTasks() {
    localStorage.setItem(
      'tasks',
      JSON.stringify(this.tasks)
    );
  }
}