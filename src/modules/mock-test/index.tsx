import { useExamStore } from "@/stores/examStore";

function MockTest() {
  const { examData } = useExamStore();

  if (!examData) {
    return <div>Loading exam data...</div>;
  }

  return (
    <div>
      <h1>{examData.testName}</h1>
      <p>Exam Type: {examData.examType}</p>
      <p>Total Marks: {examData.totalMarks}</p>
      <p>Time: {examData.time} mins</p>
      <p>Sections: {examData.section.length}</p>
    </div>
  );
}

export default MockTest;
