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
    if (!data.ok) {
      return "ERROR";
    }
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

  async deleteNew(id: number): Promise<any> {
    const url = this.baseURL + '/news/' + id;
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

  async getInterest(id:number): Promise<interest> {
    const url = this.baseURL + '/interests/' + id;
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
}
