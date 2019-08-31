export class Category {
  Title: string;
  
  public constructor(init?:Partial<Category>) {
        Object.assign(this, init);
    }
}