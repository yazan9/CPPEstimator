import { BlogPost } from '../Models/BlogPost';

//let AllBlogPosts = new Map<string, BlogPost[]>();

//export const AllBlogPosts: BenefitScenario[] = [
  //{ StopWork : "2020", StartBenefit : "2021", BenefitValue : 40000 },
  //{ StopWork : "2021", StartBenefit : "2022", BenefitValue : 50000 },
  //{ StopWork : "2022", StartBenefit : "2023", BenefitValue : 60000 },
//];

//export AllBlogPosts;

//export const AllBlogPosts: Map<string,BlogPost[]> = new Map<string, BlogPost[]>();
//AllBlogPosts.set("General", [{Title: 'Post Title 1', Body: 'Something Something', Created: new Date(), Modified: new Date()}]);
//AllBlogPosts.set("Specific", [{Title: 'Post Title 2', Body: 'Something Something', Created: new Date(), Modified: new Date()}]);

export const AllBlogPosts: BlogPost[] = [
  {
    id: 1, 
    Title: 'Creating retirement income with 3 income ETFs', 
    Body: 'When you work with people who are retired or about to retire, one of the most popular questions I hear over and over again is HOW CAN I CREATE MORE INCOME from my investments? It’s a big challenge today for retirees to invest money in such a way that they can achieve decent returns, create regular income without taking a lot of risk. With interest rates as low as they are, almost every retiree I meet is trying to find ways to increase yield and returns with the least amount of risk possible. Although I am not personally retired myself, I am a fan of investments that create income. When I look for investments, I am part of the camp that believes in low cost, passive indexing with the occasional rebalancing mechanisms. If I can find investments that also produce income or yield, I tend to be attracted to investments like REITs, Dividends or Income producing options. In the past, I have been pretty candid in sharing some of the investments that I own because it is a question I get all the time (What do you invest in?). Because I am not licensed to sell investment securities or ETFs, I will simply share with you the 3 ETFs that I own to create monthly passive income and why I own them. Disclaimer: While this may sound obvious, I don’t think it hurts to let you know that just because I own these monthly income producing ETFs, it does not mean you should too. Please do some of your own research and I have added some links throughout the article to help you with your own research. In the comments below, share with other readers what you invest in for income?',  
    Created: new Date(), 
    Modified: new Date()
  },
    
  {
    id: 2, 
    Title: 'How to Avoid Behavioural Biases That Impact You and Your Advisor', 
    Body: 'Both investors and their advisors make common invesment mistakes that negatively impact investing outcomes. You or your advisor may be subject to behavioural biases that you should aim to identify and negate. Kent Baker, Greg Filbeck, and Victor Ricciardi wrote an article in the European Financial Review discussing how behavioural biases affect finance professionals. They considered financial planners, portfolio managers, and institutional investors. These are some of the investment mistakes people make as a result of these psychological biases. Heuristics Heuristics involves problem solving using mental shortcuts or simplistic approaches like rules of thumb to make quick judgements. Advisors can sometimes be posed questions that they want to answer quickly for a client. Quick may not always be accurate, and investors should engage in thoughtful discussion with their advisors by asking “why” questions, or by encouraging their advisor to put some thought to a question or issue before commenting.', 
    Created: new Date(), 
    Modified: new Date()
  }
  ];