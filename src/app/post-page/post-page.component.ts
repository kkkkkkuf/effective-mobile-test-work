import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css'],
})
export class PostPageComponent implements OnInit {
  postId!: number;
  post: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.loadPostDetails();
    });
  }

  loadPostDetails(): void {
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.error('Error loading post details:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/posts']); // Переходим на страницу всех постов
  }
}
