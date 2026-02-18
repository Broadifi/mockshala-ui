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

export interface PopularTestData {
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
  data: PopularTestData[];
}

//all test series Categories
export interface FeatureCategories {
  status: boolean;
  approveStatus: string;
  _id: string;
  categoryName: string;
  slug: string;
  description: object;
  image: string;
  createdBy: object;
  createdAt: string;
  updatedAt: string;
  updatedBy: object;
}

export interface DashboardPaidCategoriesData {
  featureCategories: FeatureCategories[];
  otherCategories: unknown[];
}

export interface DashboardPaidCategoriesResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: DashboardPaidCategoriesData;
}


//All Exams

interface Tests {
  _id: string;
  name: string;
  testType: string;
  examType: string;
  time: number;
  image: string;
  instruction: string;
  isOpen: boolean;
  totalQuestions: number;
}

interface CountByTestType {
  FULL_LENGTH_MOCK: number;
}

interface ALLExamCategory {
  _id: string;
  slug: string;
}

interface AllExamResponseData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  tests: Tests[];
  countByTestType: CountByTestType;
  freeTestCount: number;
  paidTestCount: number;
  totalQuestions: number;
  status: boolean;
  isPaid: boolean;
  examCategory: ALLExamCategory;
  createdBy: object;
  createdAt: string;
  updatedAt: string;
}

export  interface AllExamResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  data: AllExamResponseData[];
}


//Current Affairs

interface CurrentAffairs {
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

export interface CurrentAffairsResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  totalCount: number;
  hasNext: boolean;
  page: number;
  data: CurrentAffairs[];
}