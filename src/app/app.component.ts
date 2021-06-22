import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Post } from './post';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public posts: Post[];

  constructor(
    public dialog: MatDialog,
    public postSevice: PostService
    ){}

    ngOnInit(){
      this.posts = this.postSevice.posts;
    }

  openDialog(){
    const dialogRef = this.dialog.open(PostDialogComponent,{
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(      
      (result) => {
        if(result){
          this.postSevice.salvar(result.post, result.arquivo)

        }
      }
      
      );
  }
}
