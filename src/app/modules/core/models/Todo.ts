export class Todo {
  id: string;
  title: string = "";
  description: string = "";
  createdDate: Date = new Date();
  completed: boolean = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
