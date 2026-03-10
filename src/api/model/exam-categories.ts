export interface ExamCategories {
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
  slug: string
  categoryName: string
  description: string
  image: string
}