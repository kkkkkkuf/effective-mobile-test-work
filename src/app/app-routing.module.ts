import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { PostPageComponent } from './post-page/post-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: PostsPageComponent,
  },
  {
    path: 'post/:id',
    canActivate: [AuthGuard],
    component: PostPageComponent,
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
