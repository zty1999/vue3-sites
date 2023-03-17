import Parse from "parse";
Parse.initialize('spark');
Parse.masterKey = 'mulean666';
Parse.serverURL = 'http://106.55.30.242/parse'
// Parse.initialize("spark");
// (Parse.masterKey as any) = 'mulean666';
// (Parse.javaScriptKey as any) = 'mulean666';
// (Parse as any).serverURL = "http://106.55.30.242/parse";
// (Parse as any).initialize("spark","mulean666");
// //javascriptKey is required only if you have it on server.
// (Parse as any).serverURL = 'http://106.55.30.242/parse'

const companyId = localStorage.getItem("companyId") ? localStorage.getItem("companyId") : 'eNVQ4G4GVq';
const books = {
  
}
 async function getBooks(type?:string) {
  // 'home-recommon' 首页推荐
  let Book = new Parse.Query("Book");
  Book.equalTo('company', companyId);
  Book.equalTo('isEnable', true);
  Book.notEqualTo('isRemove', true);
  let books = await Book.find();
  console.log(books);
  return ((books && books.length) ? books : [])
}
async function getBook(bookId:string) {
  let Book = new Parse.Query("Book");
  Book.get(bookId);
  let book = await Book.first();
  console.log(book);
  return ((book && book.id) ? book : {})
}

async function getChapters(bookId:string, sort?:any,limit?:number,) {
  return new Promise((resolve, reject) => {
    let Chapter = new Parse.Query("Chapter");
    Chapter.equalTo('company', companyId);
    Chapter.notEqualTo('isRemove', true);
    Chapter.equalTo('book', bookId);
    if (sort && sort.type == 'ascending') {
      Chapter.ascending(sort.key);
    }
    if (sort && sort.type == 'descending') {
      Chapter.descending(sort.key);
    }
    if(limit){
      Chapter.limit(limit);
    }
    Chapter.find().then(chapters=>{
      if (chapters && chapters.length) {
        resolve(chapters)
        console.log(chapters);
      }else{
        resolve([])
      }
    });
  })
}
async function getCount(schema:string,key:string,value:string) {
    let Class = new Parse.Query(schema);
    Class.equalTo(key,value)
    let count = Class.count();
    return count;
}
export {
  getBooks,
  getBook,
  getChapters,
  getCount
} 

// export class BookService {
//   constructor() {

//   }
//   // async getBooks() {
//   //   let Book = new Parse.Query("Book");
//   //   Book.equalTo('company', companyId);
//   //   Book.equalTo('isEnable', true);
//   //   Book.notEqualTo('isRemove', true);
//   //   let books = await Book.find();
//   //   console.log(books);
//   //   return ((books && books.length) ? books : [])
//   // }
//   // async collectBook(bookId: string) {
//   //   let Book = Parse.Object.extend("CollectBook");
//   //   let book = new Book();
//   //   book.set("book", {
//   //     "__type": "Pointer",
//   //     "className": "CollectBook",
//   //     "objectId": bookId
//   //   });
//   //   let res = await book.save();
//   //   return ((res && res.id) ? res : "网络异常，请稍后重试")
//   // }
// }