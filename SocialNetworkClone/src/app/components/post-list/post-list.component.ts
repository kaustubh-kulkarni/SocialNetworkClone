import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../_interfaces/post.model';
import { PostsService } from '../_services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

}
