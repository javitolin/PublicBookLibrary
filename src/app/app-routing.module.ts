import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BooksComponent,
    // children: [
    //   { path: '', component: RecipeStartComponent },
    //   { path: 'new', component: RecipeEditComponent },
    //   {
    //     path: ':id',
    //     component: RecipeDetailComponent,
    //     resolve: [RecipesResolverService]
    //   },
    //   {
    //     path: ':id/edit',
    //     component: RecipeEditComponent,
    //     resolve: [RecipesResolverService]
    //   }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
