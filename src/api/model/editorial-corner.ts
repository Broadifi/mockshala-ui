export interface EditorialCornerData {
  _id: string;
  title: string;
  metaTitle: string;
  tags: string[];
  image: string;
  thumbnailImage: string;
  description: string;
  metaDescription: string;
  status: boolean;
  approveStatus: string;
  publishedDate: string;
  slug: string;
 
}
// export interface otherEditorials{
//   thumbna
// }
export interface EditorialCornerBlog{
  data:EditorialCornerData[];
   meta:{
    prevBlog:string;
    nextBlog:string;
    otherEditorials:EditorialCornerData[];
  }
}
export interface EditorialCornerResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  // data: EditorialCornerData[];
  data:EditorialCornerData[];
  
  // meta:EditorialCornerBlog{};
  // currentPage: number;
  
}