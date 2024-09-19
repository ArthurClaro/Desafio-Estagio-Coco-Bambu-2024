import{a as U,g as K}from"./chunk-WDVV34M4.js";import{A as Z,B as ee,a as G,b as J,g as W,i as Y,k as X}from"./chunk-6KTGHWSU.js";import{q as N}from"./chunk-VLIKV6YA.js";import{$ as V,$a as o,Ab as q,Ca as s,J as y,La as m,N as v,Qa as f,R as T,Ta as I,X as g,Xa as u,Ya as j,Za as z,_a as L,a as A,ab as i,b as D,bb as c,fb as w,ia as h,ib as C,ja as _,jb as d,mb as Q,o as O,pa as $,pb as B,qb as S,rb as E,sb as R,tb as l,vb as b,z as P,za as F}from"./chunk-KZNR27XO.js";var p={api:"https://us-central1-curso-de-angular-api.cloudfunctions.net/app/tasks",apiBooksBaseUrl:"https://www.googleapis.com/books/v1/volumes",apiBooksKey:"AIzaSyAnkLK7se_lJIeR47gyqoOgRnj82deARfk"};var k=class n{#e=g(U);#r=m(p.api);search="";get#l(){return`${p.apiBooksBaseUrl}?q=${this.search}&key=${p.apiBooksKey}`}#t=m(null);get getAllBooks(){return this.#t.asReadonly()}#n=m(null);get getAllBooksError(){return this.#n.asReadonly()}httpAllBooks$(t){return this.search=t,this.#t.set(null),this.#n.set(null),this.#e.get(this.#l).pipe(y(),v(e=>this.#t.set(e)),P(e=>(this.#n.set(e.error.message),O(()=>e))))}bookId="";get#a(){return`${p.apiBooksBaseUrl}/${this.bookId}?key=${p.apiBooksKey}`}#o=m(null);get getBookId(){return this.#o.asReadonly()}#i=m(null);get getBookIdErro(){return this.#i.asReadonly()}httpBookId$(t){return this.bookId=t,this.#o.set(null),this.#i.set(null),this.#e.get(`${this.#a}`).pipe(y(),v(e=>this.#o.set(e)),P(e=>(this.#i.set(e.error.message),O(()=>e))))}static \u0275fac=function(e){return new(e||n)};static \u0275prov=T({token:n,factory:n.\u0275fac,providedIn:"root"})};var ne=["search"],oe=["booksSection"];function ie(n,t){n&1&&(o(0,"h3",2),l(1,"Trending this week"),i())}function re(n,t){if(n&1&&(o(0,"h3",2),l(1),i()),n&2){let e=d();s(),b("Your Search: ",e.nameSearch,"")}}function le(n,t){if(n&1&&c(0,"img",7),n&2){let e=d().$implicit;Q("alt",e.volumeInfo.title),I("src",e.volumeInfo.imageLinks.thumbnail,F)}}function ae(n,t){n&1&&c(0,"p-skeleton",8)}function se(n,t){if(n&1&&(o(0,"p"),l(1),i()),n&2){let e=d().$implicit;s(),b(" ",e.volumeInfo.authors,"")}}function ce(n,t){n&1&&(o(0,"p"),l(1,"Sem Autor"),i())}function me(n,t){if(n&1){let e=w();o(0,"li"),f(1,le,1,2,"img",7)(2,ae,1,0,"p-skeleton",8),o(3,"h5"),l(4),i(),f(5,se,2,1,"p")(6,ce,2,0,"p"),c(7,"p-rating",9),o(8,"button",5),C("click",function(){let r=h(e).$implicit,x=d(2);return _(x.clickBookDetails(r.id))}),o(9,"h6"),l(10,"Read more"),i(),c(11,"i",10),i()()}if(n&2){let e=t.$implicit;s(),u(e.volumeInfo.imageLinks&&e.volumeInfo.imageLinks.thumbnail?1:2),s(3),b(" ",e.volumeInfo.title,""),s(),u(e.volumeInfo.authors?5:6),s(2),I("ngModel",e.randomRating)("readonly",!0)("cancel",!1)}}function pe(n,t){n&1&&(o(0,"h2"),l(1,"Loading..."),i())}function ge(n,t){n&1&&(o(0,"ul"),z(1,me,12,6,"li",null,j,!1,pe,2,0,"h2"),i()),n&2&&(s(),L(t))}function ue(n,t){n&1&&(o(0,"li"),l(1,"erro de conexa\xF5a"),i())}var H=class n{#e=g(k);books=[];searchValue="Maquiavel";bookDetail=null;getBooks=this.#e.getAllBooks;getBooksId=this.#e.getBookId;ngOnInit(){console.log("Component Initialized. Performing initial search with:",this.searchValue),this.searchBooks(this.searchValue)}searchBooks(t){console.log("Searching for books with value:",t),this.#e.httpAllBooks$(t).subscribe({next:e=>{console.log("Response received:",e),this.books=(e.items||[]).map(a=>D(A({},a),{randomRating:this.getRandomValue(0,5)})),console.log("Books with ratings:",this.books)},error:e=>{console.log("Error fetching books:",e),this.books=[]}})}getRandomValue(t,e){return Math.floor(Math.random()*(e-t+1))+t}search;booksSection;nameSearch="";searchBookOrAuthor(t){t?(console.log("User searched for:",t),this.nameSearch=t,this.searchBooks(t),this.scrollToBooks(),this.search.nativeElement.value=""):console.log("Search input is empty.")}scrollToBooks(){this.booksSection.nativeElement.scrollIntoView({behavior:"smooth"})}outputBookDetails=new $;#r=g(K);bookDetails(t){console.log("Fetching details for book ID:",t),this.#e.httpBookId$(t).subscribe({next:e=>{console.log("Book details response:",e),this.bookDetail=e,this.#r.navigate([`/book-details/${e.id}`],{state:{bookDetail:e}})},error:e=>{console.log("Error fetching book details:",e),this.bookDetail=null}})}clickBookDetails(t){t?(console.log("Book clicked, ID:",t),this.bookDetails(t)):console.log("No book ID provided.")}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=V({type:n,selectors:[["app-home"]],viewQuery:function(e,a){if(e&1&&(B(ne,5),B(oe,5)),e&2){let r;S(r=E())&&(a.search=r.first),S(r=E())&&(a.booksSection=r.first)}},outputs:{outputBookDetails:"outputBookDetails"},standalone:!0,features:[q],decls:19,vars:2,consts:[["search",""],["booksSection",""],[1,"title"],["src","assets/images/goodreads.svg","alt","Goodreads logo"],["type","text","placeholder","Search book, name, author, ......",3,"keyup.enter"],[3,"click"],["src","assets/icons/search-input.svg","alt","Goodreads logo"],[3,"src","alt"],["width","10rem","height","4rem"],[3,"ngModel","readonly","cancel"],[1,"pi","pi-window-maximize"]],template:function(e,a){if(e&1){let r=w();o(0,"main")(1,"section")(2,"div")(3,"h4",2),l(4,"Welcome to"),i(),c(5,"img",3),i(),o(6,"label")(7,"input",4,0),C("keyup.enter",function(){h(r);let M=R(8);return _(a.searchBookOrAuthor(M.value))}),i(),o(9,"button",5),C("click",function(){h(r);let M=R(8);return _(a.searchBookOrAuthor(M.value))}),c(10,"img",6),i()(),o(11,"p"),l(12,"Meet your favorite book, find you reading community, and manage you reading life."),i()(),o(13,"article",null,1),f(15,ie,2,0,"h3",2)(16,re,2,1,"h3",2)(17,ge,4,1,"ul")(18,ue,2,0,"li"),i()()}if(e&2){let r;s(15),u(a.nameSearch?16:15),s(2),u((r=a.books)?17:18,r)}},dependencies:[N,J,G,X,W,Y,ee,Z],styles:["main[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:50px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:83vh;max-width:100vw;align-items:center}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:65%;align-items:center;justify-content:center;gap:20px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:59px;letter-spacing:1px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:180px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{border:2px solid black;display:flex;align-items:center;flex-direction:row-reverse;justify-content:center;width:45%;height:45px;border-radius:32px;padding-left:10px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;background-color:transparent;font-size:14px;letter-spacing:.1px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible{outline:none}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;cursor:pointer;background:transparent;display:flex;align-items:center;justify-content:center;height:39px}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{background:transparent;width:100%;height:100%}main[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{padding-top:25px;display:flex;font-size:24px;letter-spacing:1px;width:57%;height:97px;align-items:center;justify-content:center;text-align:center;line-height:32px}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:25px;padding:50px 55px;background-color:var(--contents)}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding-left:112px;font-size:27px;padding-bottom:17px}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;gap:60px;justify-content:center}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:205px;height:385px;max-height:385px;justify-content:space-between}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{box-shadow:14px 11px 8px #00000059;height:241px}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .p-skeleton.p-component[_ngcontent-%COMP%]{height:241px!important;width:100%!important}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{text-align:center;margin-top:13px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;color:var(--author);font-style:italic;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .p-element.ng-untouched.ng-pristine.ng-valid[_ngcontent-%COMP%]{text-align:center}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .p-rating[_ngcontent-%COMP%]   .p-rating-item.p-rating-item-active[_ngcontent-%COMP%]   .p-rating-icon[_ngcontent-%COMP%]{color:var(--author)}main[_ngcontent-%COMP%]   article[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{border:none;background-color:var(--author);height:40px;text-align:center;width:100%;font-weight:700;font-size:16px;letter-spacing:.3px;cursor:pointer;display:flex;flex-direction:row;color:var(--text-primary)!important;align-items:center;justify-content:center;gap:8px}"]})};export{H as default};
