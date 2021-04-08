import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // Props
  enteredContent = '';
  enteredTitle = '';
  // Turns into event which can be used outside
  @Output() postCreated = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  // To create a post
  onAddPost() {
    const post = {
      title: this.enteredTitle,
      content: this.enteredContent
    };
    this.postCreated.emit(post);
  }

}
