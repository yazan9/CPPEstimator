export class Category {
  id: number;
  name: string;
  
  public constructor(init?:Partial<Category>) {
        Object.assign(this, init);
    }
}