import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../_interfaces/post.model';
import { PostsService } from '../_services/posts.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  // Props
  enteredContent = '';
  enteredTitle = '';
 

  constructor(private postsService: PostsService) { }

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
    this.postsService.addPost(form.value.title, form.value.content)
  }

}
