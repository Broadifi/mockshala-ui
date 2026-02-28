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

export interface EditorialCornerResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  data: EditorialCornerData[];
}