export interface SubmitExamPayload {
  _id: string;
  testSeries: string;
  test: string;
  user: string;
  time: number;
  examType: string;
  completedTime: number;
  section: SectionPayload[];
  isSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface SectionPayload {
  time: number;
  completedTime: number;
  _id: string;
  sectionName: string;
  questions: QuestionPayload[];
}
export interface QuestionPayload {
  questionType: string;
  answerText: string;
  answerId: string;
  marks: number;
  negativeMarks: number;
  marksObtained: number;
  isCorrect: boolean;
  _id: string;
  questionRef: string;
  questionText: string;
  options: OptionPayload[];
  difficultyLevel: string;
  subject: string;
  topic?: string;
  chapter?: string;
  paragraphRef?: string;
  paragraphText?: string;
}
export interface OptionPayload {
  _id: string;
  optionText: string;
}


//Submit Exam Response

export interface SubmitExamResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: SubmitExamData;
}

export interface SubmitExamData {
  _id: string;
  testSeries: string;
  test: string;
  user: string;
  time: number;
  examType: string;
  completedTime: number;
  section: Section[];
  isSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}
interface Section {
  time: number;
  completedTime: number;
  _id: string;
  sectionName: string;
  questions: Question[];
}
interface Question {
  questionType: string;
  answerText: string;
  answerId: string;
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
  topic?: string;
  chapter?: string;
  paragraphRef?: string;
  paragraphText?: string;
}
interface Option {
  isCorrectOption?: boolean | boolean | null;
  _id: string;
  optionText: string;
}