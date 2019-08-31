export class BlogPost {
  id: number;
  Title: string;
  Body: string;
  Created: Date;
  Modified: Date;
  
  public constructor(init?:Partial<BlogPost>) {
        Object.assign(this, init);
    }
}