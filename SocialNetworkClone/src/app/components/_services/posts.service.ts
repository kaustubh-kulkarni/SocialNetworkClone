import { Injectable } from "@angular/core";
import { Post } from "../_interfaces/post.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient, private router: Router){}

    getPosts(){
        this.http.get<{message: string, posts: any}>(this.baseUrl + '/posts').pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        })).subscribe(transformedPosts => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener(){
        return this.postsUpdated.asObservable();
    }

    getPost(id: string){
        return this.http.get<{_id: string, title: string, content: string}>(this.baseUrl + '/posts/' + id);
    }

    addPost(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append("title", title);
        postData.append("content", content);
        postData.append("image", image, title);
        this.http.post<{message: string, postId: string}>(this.baseUrl + '/posts', postData).subscribe((res) => {
            const post: Post = {id: res.postId, title: title, content: content}
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
            this.router.navigateByUrl("/");
        });
    }

    updatePost(id: string, title: string, content: string){
        const post: Post = {id: id, title: title, content: content};
        this.http.put(this.baseUrl + '/posts/' + id, post).subscribe(response => {
            const updatedPosts = [...this.posts];
            const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
            updatedPosts[oldPostIndex] = post;
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigateByUrl("/");
        });
    }

    deletePost(postId: string){
        this.http.delete(this.baseUrl + '/posts/' + postId).subscribe(() => {
            const updatedPosts = this.posts.filter(post => post.id !== postId);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
}