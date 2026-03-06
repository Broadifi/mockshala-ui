export interface ExamInstructionResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: ExamInstructionData;
}
interface ExamInstructionData {
   _id: string;
  name: string;
  exam: string;
  testType: string;
  examType: string;
  difficultyLevel: string;
  time: number;
  section: Section[];
  status: boolean;
  instruction: string;
  instructionInHindi: string;
  image?: string | unknown;
  testSeriesId: string;
  testSeriesName: string;
  highScore: number;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}
interface Section {
  time: number;
  isFixedNegativeMark: boolean;
  marks: number;
  negativeMarks: number;
  _id: string;
  sectionName: string;
  totalScore: number;
  totalQuestion: number;
}


///
