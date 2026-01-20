interface BannerData {
  _id: string;
  title: string;
  position: number;
  redirectUrl: string;
  image: string;
  imageForMobile: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BannerResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  data: BannerData[];
}


// Data for Popular Tests
export interface ExamCategory {
  _id: string;
  slug: string;
}

export interface Data {
  _id: string;
  name: string;
  slug: string;
  image: string;
  examCategory: ExamCategory;
}

export interface PopularTestResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: Data[];
}

