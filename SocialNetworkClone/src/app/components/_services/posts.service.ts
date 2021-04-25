import { Injectable } from "@angular/core";
import { Post } from "../_interfaces/post.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient){}

    getPosts(){
        this.http.get<{message: string, posts: Post[]}>(this.baseUrl + '/posts').subscribe((postData) => {
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {id:null, title: title, content: content};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
}