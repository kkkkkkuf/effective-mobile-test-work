import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/services/post.service';
import { Router } from '@angular/router';
import { Post } from '../interface/post';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css'],
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error loading posts:', err),
    });
  }

  goToPostDetails(id: number): void {
    this.router.navigate(['/post', id]);
  }
}
