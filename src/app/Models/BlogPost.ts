import { Category } from './Category';

export class BlogPost {
  id: number;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
  category: Category;
  
  public constructor(init?:Partial<BlogPost>) {
        Object.assign(this, init);
    }
}