export interface PlansResponse {
  error: boolean
  status: boolean
  statusCode: number
  responseTimestamp: string
  totalCount: number
  data: PlansData[]
}

export interface PlansData {
  _id: string
  name: string
  description: string
  price: number
  mrpPrice: number
  discountType: string
  flatDiscount: number
  discountInPercent: number
  status: boolean
  duration: number
  testSeries?: TestSeries[]
  max?: number
  isUnlimited: boolean
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export interface TestSeries {
  _id: string
  name: string
}
