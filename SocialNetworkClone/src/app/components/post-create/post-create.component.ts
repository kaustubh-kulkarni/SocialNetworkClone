import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // Props
  newPost = 'NO CONTENT';

  constructor() { }

  ngOnInit(): void {
  }
  // To create a post
  onAddPost() {
    this.newPost = "Hello. This is user post";
  }

}
