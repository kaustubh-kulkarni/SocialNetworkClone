import { Injectable } from "@angular/core";
import { Post } from "../_interfaces/post.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient){}

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

    addPost(title: string, content: string) {
        const post: Post = {id:null, title: title, content: content};
        this.http.post<{message: string}>(this.baseUrl + '/posts', post).subscribe((res) => {
            console.log(res.message);
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
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