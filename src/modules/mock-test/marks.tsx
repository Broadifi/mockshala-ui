interface MarksProps{
  marks: number,
  negativeMarks: number
}
function Marks({marks=0, negativeMarks=0}:MarksProps) {
  return (
    <div className="flex gap-2 text-xs sm:text-sm">
        <div className="bg-green-200 rounded-lg px-2 py-1">
            <p className="text-answered">+ {marks}</p>
        </div>

        <div className="bg-red-200 rounded-lg px-2 py-1">
            <p className="text-notAnswered">- {negativeMarks}</p>
        </div>
    </div>
  )
}

export default Marks