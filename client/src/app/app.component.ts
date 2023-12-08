import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  valid = true;
  sentenceStr = 'hello this is how because think show who read while window who is this hello this is how because think show who read while window who is this';
  sentence = this.sentenceStr.split(' ');
  index: number = 0;
  typed: string = '';
  totalTyped: string = '';
  typedLetterArray: any = [];
  acc: number = 0;
  correct: number = 0;
  incorrect: number = 0;
  complete: boolean = false;
  wpm: number = 0;
  time: number = 0;
  username: string = 'Jesse Trevena';

  constructor(private http: HttpClient) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.totalTyped.length == 1) {
      let intervalId = setInterval(() => {
        this.time += 1;
        console.log(this.time);
        if (this.complete) clearInterval(intervalId);
      }, 1000);
    }
    if (event.key.length == 1 && event.key != ' ') {
      this.typed += event.key;
    }
    if (event.key == ' ') {
      this.spaceEvent();
    } else if (event.key == 'Backspace') {
      this.backspaceEvent();
    } else if (event.key.length == 1) {
      this.checkValid();
    }
  }

  restart() {
    this.complete = false;
    this.index = 0;
    this.typed = '';
    this.totalTyped = '';
    this.typedLetterArray = [];
    this.correct = 0;
    this.incorrect = 0;
    this.time = 0;
  }

  checkComplete() {
    if (
      this.index == this.sentence.length - 1 &&
      this.typed.length == this.sentence[this.index].length
    ) {
      this.complete = true;
      this.wpm = Math.round(((this.correct / 5) * 60) / this.time);
      const body = {
        time: this.time,
        wpm: this.wpm,
        date: new Date(),
        username: this.username,
        race_dialog:this.sentenceStr
      };
      this.http.post('http://localhost:8080/races', body).subscribe((data) => {
        console.log(data);
      });
    }
  }

  backspaceEvent() {
    console.log(
      this.totalTyped + ' ----- ' + this.sentence.slice(0, this.index).join(' ')
    );
    if (
      this.totalTyped.length >
        this.sentence.slice(0, this.index).join(' ').length + 1 ||
      this.index == 0
    ) {
      this.typedLetterArray.pop();
      this.typed = this.typed.slice(0, this.typed.length - 1);
      this.totalTyped = this.totalTyped.slice(0, this.totalTyped.length - 1);
    }
  }

  spaceEvent() {
    for (
      let i = 0;
      i < this.sentence[this.index].length - this.typed.length;
      i++
    ) {
      this.typedLetterArray.push({ letter: ' ', valid: false });
      this.totalTyped += ' ';
      this.incorrect++;
    }
    this.totalTyped += ' ';
    this.index++;
    this.typed = '';
  }

  checkValid() {
    this.checkComplete();
    if (!this.complete) {
      this.totalTyped += this.typed.charAt(this.typed.length - 1);
      if (this.typed != ' ') {
        if (
          this.sentence[this.index].charAt(this.typed.length - 1) ==
          this.typed.charAt(this.typed.length - 1)
        ) {
          this.valid = true;
          this.correct++;
        } else {
          this.valid = false;
          this.incorrect++;
        }
        if (this.typed.length <= this.sentence[this.index].length) {
          this.typedLetterArray.push({
            letter: this.typed.charAt(this.typed.length - 1),
            valid: this.valid,
          });
        } else {
          this.typed = this.typed.slice(0, this.typed.length - 1);
          this.totalTyped = this.totalTyped.slice(
            0,
            this.totalTyped.length - 1
          );
        }
      }
    }
  }

  cumulativeLength(index: any) {
    this.acc = 0;
    for (let i = 0; i < index; i++) {
      this.acc += this.sentence[i].length;
    }
    return this.acc;
  }
}
