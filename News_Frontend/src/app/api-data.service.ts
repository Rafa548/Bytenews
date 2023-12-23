import { Injectable } from '@angular/core';
import {author, interest, news, publisher, user} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  baseURL = 'http://localhost:8000';

  constructor() { }

  async login(u_name: string, password: string): Promise<any> {
    const url = this.baseURL + '/login';
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({username: u_name, password: password}) });
    return await data.json() ?? undefined;
  }

  async getNews(): Promise<news[]> {
    const url = this.baseURL + '/news';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getNew(id: number): Promise<news> {
    const url = this.baseURL + '/news/' + id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getNewsByTitle(title: string): Promise<news[]> {
    const url = this.baseURL + '/news/search/' + title;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getNewsComments(id: number): Promise<any> {
    const url = this.baseURL + '/news/' + id + '/comments';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getCommentsByUser(id: number): Promise<any> {
    const url = this.baseURL + '/comments/'+ 'user/' + id ;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async postComment(id: number, user_id: any, comment: string): Promise<any> {
    const url = this.baseURL + '/news/' + id + '/comment/';
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({user: user_id, text: comment}) });
    return await data.statusText ?? undefined;
  }

  async deleteNewsComment(id: number): Promise<any> {
    const url = this.baseURL + '/news/comments/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async deleteNew(id: number): Promise<any> {
    const url = this.baseURL + '/news/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async deleteAuthor(id: number): Promise<any> {
    const url = this.baseURL + '/authors/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async updateNew(news : news): Promise<news> {
    const id = news.id;
    const url = this.baseURL + '/news/' + id;
    const data = await fetch(url, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(news) });
    return await data.json() ?? undefined;
  }

  async getNewsByInterest(id: number): Promise<news[]> {
    const url = this.baseURL + '/news/' + 'interest/' +  id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getNewsByPublisher(id: number): Promise<news[]> {
    const url = this.baseURL + '/news/' + 'publisher/' +  id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getNewsByUser(id: number): Promise<news[]> {
    const url = this.baseURL + '/users/' +  id + '/news/';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getUsers(): Promise<user[]> {
    const url = this.baseURL + '/users';
    const data = await fetch(url, {method: 'GET' });
    return await data.json() ?? undefined;
  }

  async getUser(id: number): Promise<user> {
    const url = this.baseURL + '/users/' + id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async deleteUser(id: number): Promise<any> {
    const url = this.baseURL + '/users/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async getAuthor(id: number): Promise<author> {
    const url = this.baseURL + '/authors/' + id;
        const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getPublishers(): Promise<publisher[]> {
    const url = this.baseURL + '/publishers';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getInterests(): Promise<interest[]> {
    const url = this.baseURL + '/interests';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }



  async deleteInterest(id: number): Promise<any> {
    const url = this.baseURL + '/interests/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async getPublisher(id:number): Promise<publisher> {
    const url = this.baseURL + '/publishers/' + id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async deletePublisher(id: number): Promise<any> {
    const url = this.baseURL + '/publishers/' + id;
    const data = await fetch(url, {method: 'DELETE'});
    return await data.statusText ?? undefined;
  }

  async getPublisherAuthors(id:number): Promise<author[]> {
    const url = this.baseURL + '/publishers/' + id + '/authors';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getAuthorNews(id:number): Promise<news[]> {
    const url = this.baseURL + '/authors/' + id + '/news';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async registerUser(json:{email:string,password:string,username:string,firstName:string,lastName:string}): Promise<any> {
    const url = this.baseURL + '/register';
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
    return await data.statusText ?? undefined;
  }

  async registerAdmin(json:{email:string,password:string,username:string,firstName:string,lastName:string,is_author:boolean}): Promise<any> {
    const url = this.baseURL + '/admin/add_user';
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
    return await data.statusText ?? undefined;
  }

  async saveNews(news_id:number, user_id:any): Promise<any> {
    const url = this.baseURL + '/user/' + user_id + '/save_news/' + news_id + '/';
    const data = await fetch(url, {method: 'POST'});
    return await data.statusText ?? undefined;
  }

  async getSavedNews(user_id:any): Promise<news[]> {
    const url = this.baseURL + '/user/' + user_id + '/saved_news';
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }


  async unsaveNews(news_id:number, user_id:any): Promise<any> {
    const url = this.baseURL + '/user/' + user_id + '/unsave_news/' + news_id + '/';
    const data = await fetch(url, {method: 'POST'});
    return await data.statusText ?? undefined;
  }

  async getNewsByTag(tag_id:number): Promise<news[]> {
    const url = this.baseURL + '/news/interest/' + tag_id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async getInterest(id:number): Promise<interest> {
    const url = this.baseURL + '/interests/' + id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }

  async createNews(json:{title:string|undefined,description:string|undefined,content:string|undefined,published_by:number|undefined,tags:any[]}): Promise<any> {
    const url = this.baseURL + '/news/';
    console.log("json",json);
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
    return await data.statusText ?? undefined;
  }

  async updateNews(id:number,json:{title:string|undefined,description:string|undefined,content:string|undefined}): Promise<any> {
    const url = this.baseURL + '/news/' + id;
    console.log("json",json);
    const data = await fetch(url, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
    return await data.statusText ?? undefined;
  }

  async getAuthorByUser(id:number): Promise<author> {
    const url = this.baseURL + '/authors/user/' + id;
    const data = await fetch(url, {method: 'GET'});
    return await data.json() ?? undefined;
  }


  async updateAuthor(author : author): Promise<author> {
    //console.log(author)
    const id = author.id;
    const url = this.baseURL + '/authors/' + id;
    const data = await fetch(url, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(author) });
    return await data.json() ?? undefined;
  }

  async updateUser(user : user): Promise<user> {
    //console.log(user)
    const id = user.id;
    const url = this.baseURL + '/users/' + id;
    const data = await fetch(url, {method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) });
    return await data.json() ?? undefined;
  }

  async createAuthor(author : author): Promise<author> {
    const url = this.baseURL + '/authors/' ;
    console.log(url)
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(author) });
    return await data.json() ?? undefined;
  }

  async createInterest(interest : any): Promise<interest> {
    const url = this.baseURL + '/interests/' ;
    console.log(url)
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(interest) });
    return await data.json() ?? undefined;
  }

  async createPublisher(publisher : any): Promise<publisher> {
    const url = this.baseURL + '/publishers/' ;
    console.log(url)
    const data = await fetch(url, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(publisher) });
    return await data.json() ?? undefined;
  }
}
