import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../_interfaces/post.model';


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
  @Output() postCreated = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }
  // To create a post
  onAddPost(form: NgForm) {
    if(form.invalid){
      return;
    }
    const post: Post = {
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }

}
