import { Router } from "express";

export class RouterConfig<T> {
  router: Router;
  controller: T;

  constructor(TCOntroller: { new (): T }) {
    this.router = Router();
    this.controller = new TCOntroller();
    this.routes();
  }

  routes() {}
}
