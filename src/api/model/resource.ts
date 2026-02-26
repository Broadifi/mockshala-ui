export interface ResourcesResponse {
  error: boolean
  status: boolean
  statusCode: number
  responseTimestamp: string
  totalCount: number
  hasNext: boolean
  page: number
  data: Daum[]
}

export interface Daum {
  _id: string
  title: string
  file: File
  examCategory: ExamCategory
  publishedDate: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface File {
  _id: string
  originalname: string
  encoding: string
  mimetype: string
  size: number
  path: string
  createdAt: string
  updatedAt: string
}

export interface ExamCategory {
  _id: string
  categoryName: string
  slug: string
}
