export interface TestDetailsResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data:TestDetailsData;
}

export interface TestDetailsData {
  status: boolean;
  approveStatus: string;
  isPaid: boolean;
  price: number;
  durationTime: number;
  _id: string;
  name: string;
  exam: Exam;
  tests: Test[];
  examCategory: ExamCategory;
  description: string;
  extraDescription?:  string | null;
  image: string;
  createdBy?:  string | null;
  createdAt: string;
  updatedAt: string;
  updatedBy?:  string | null;
  slug: string;
   paymentObj: Record<string, unknown>;
}

interface ExamCategory {
  status: boolean;
  approveStatus: string;
  _id: string;
  categoryName: string;
  slug: string;
  description?:string | null;
  image: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}
interface Test {
  publishedStatus: string;
  time: number;
  status: boolean;
  approveStatus: string;
  _id: string;
  name: string;
  testType: string;
  exam: string;
  examType: string;
  difficultyLevel: string;
  section: Section[];
  instruction: string;
  instructionInHindi: string;
  image: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  sectionCount: number;
  totalQuestions: number;
  isOpen: boolean;
  isAttempted: boolean;
  attemptedId?: string | null;
  highestScore: number;
  rejectionReason?: string;
}
interface Section {
  time: number;
  isFixedNegativeMark?: boolean;
  marks?: number;
  negativeMarks?: number;
  _id: string;
  sectionName: string;
  questions: Question[];
}
interface Question {
  marks: number;
  negativeMarks: number;
  _id: string;
  question: string;
}
interface Exam {
  status: boolean;
  approveStatus: string;
  _id: string;
  examName: string;
  slug: string;
  examCategory: string;
  description?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}