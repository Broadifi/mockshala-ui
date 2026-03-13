export interface ExamInstructionResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: ExamInstructionData;
}
export interface ExamInstructionData {
   _id: string;
  name: string;
  exam: string;
  testType: string;
  examType: string;
  difficultyLevel: string;
  time: number;
  section: InstructionSection[];
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
interface InstructionSection {
  time: number;
  isFixedNegativeMark: boolean;
  marks: number;
  negativeMarks: number;
  _id: string;
  sectionName: string;
  totalScore: number;
  totalQuestion: number;
}


//Start Exam Model



export interface StartExamResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: StartExamData;
}
export interface StartExamData {
  _id: string;
  testSeries: string;
  testName: string;
  test: string;
  user: string;
  time: number;
  examType: string;
  completedTime: number;
  section: Section[];
  isSubmitted: boolean;
  totalMarks: number;
  finalMarks: number;
  isPaused: boolean;
  lastVisitedSection?: string;
  lastVisitedQuestion?: string;
  examTotalMarks: number;
  examTotalNegetiveMarks: number;
  totalNegativeMarks: number;
  createdAt: string;
  updatedAt: string;
}

export interface Section {
  time: number;
  completedTime: number;
  totalMarksObtained: number;
  totalNegativeMarksObtained: number;
  totalMarks: number;
  totalNegativeMarks: number;
  _id: string;
  sectionName: string;
  questions: Question[];
}

export interface Question {
  questionType: string;
  answerText?: string | null;
  answerId?: string | null;
  marks: number;
  negativeMarks: number;
  marksObtained: number;
  isCorrect: boolean;
  _id: string;
  questionRef: string;
  questionText: string;
  options: Option[];
  difficultyLevel: string;
  subject: string;
  topic?: (null | string)[];
  chapter?: (null | string)[];
  paragraphRef?: string;
  paragraphText?: string;
  isMarkedForReview: boolean;
  isVisited: boolean;
  sNo: number;
}
interface Option {
  _id: string;
  optionText: string;
}
