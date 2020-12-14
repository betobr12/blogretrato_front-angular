import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post';

@Injectable({
  providedIn: 'root'// esta injetado direto no servise do appmodule
})
export class PostService {

  public posts: Post[] = [ ];

  //parte de serviços para acesso a api laravel, importante criar um serviço para cada modulo

  constructor(private http: HttpClient) { 
    this.http.get("/api").subscribe(
      (posts: any[])=>{
        for(let p of posts){
          this.posts.push(
            new Post(
              p.nome, p.titulo, p.subtitulo, p.email, p.mensagem, p.arquivo, p.id, p.likes
              )
          )
        }
      }
    )
  }
  salvar(post: Post, file: File){
    const uploadData = new FormData();
    uploadData.append('nome',post.nome); //local da api, local do front
    uploadData.append('titulo',post.titulo); //local da api, local do front
    uploadData.append('subtitulo',post.subtitulo); //local da api, local do front
    uploadData.append('email',post.email); //local da api, local do front
    uploadData.append('mensagem',post.mensagem); //local da api, local do front
    uploadData.append('arquivo',file, file.name); //local da api, local do front

    this.http.post("/api", uploadData, { reportProgress:true, observe: 'events' })
    .subscribe((event: any)=>{
      if(event.type == HttpEventType.Response){
       // console.log(event);
       let p: any = event.body;
       this.posts.push(
        new Post(
          p.nome, p.titulo, p.subtitulo, p.email, p.mensagem, p.arquivo, p.id, p.likes
          )
        );
      }
      if (event.type == HttpEventType.UploadProgress){
        console.log('UploadProgress');
        console.log(event);
      }
    })
  }

  like(id: number){
    this.http.get('/api/like/'+id).subscribe(
      (event: any)=>{
        //console.log(event);
        let p =  this.posts.find((p)=> p.id == id );
        p.likes = event.likes;

      }
    )
  }

  apagar(id: number){
    this.http.delete("/api/"+id).subscribe(event =>{
     // console.log(event);
     let i =  this.posts.findIndex((p)=> p.id == id );
     if(i >=0 )
     this.posts.splice(i,1);

    })
  }
}
