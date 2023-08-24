import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interface/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    const url = `${this.baseUrl}/posts`;
    return this.http.get<Post[]>(url);
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.baseUrl}/posts/${id}`;
    return this.http.get<Post>(url);
  }
}
