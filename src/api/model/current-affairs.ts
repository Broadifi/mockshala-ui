export interface CurrentAffairsData {
  _id: string;
  title: string;
  titleInHindi: string;
  tags: string[];
  image: string;
  description: string;
  descriptionInHindi: string;
  status: boolean;
  publishedDate: string;
  slug: string;
  createdBy: object;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentAffairsResponseAll {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  data: CurrentAffairsData[];
}

//

export interface CurrentAffairsBySlugData {
  _id: string;
  title: string;
  titleInHindi: string;
  tags: string[];
  image: string;
  description: string;
  descriptionInHindi: string;
  status: boolean;
  publishedDate: string;
  slug: string;
  createdBy: object;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentAffairsBySlugResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: CurrentAffairsBySlugData;
}

//type of tagFilter



//All flags 

export interface CurrentAffairsAllFlagsData {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export  interface CurrentAffairsAllFlagsRes {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: CurrentAffairsAllFlagsData[];
}


//Similar news

export interface SimilarNewsData {
  _id: string;
  title: string;
  titleInHindi: string;
  tags: string[];
  image: string;
  description?: string | undefined;
  descriptionInHindi?: string | undefined;
  status: boolean;
  publishedDate: string;
  slug: string;
  saveForLater: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SimilarNewsResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: SimilarNewsData[];
}