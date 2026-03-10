function Marks() {
  return (
    <div className="flex gap-2 text-sm">
        <div className="bg-green-200 rounded-lg px-2 py-1">
            <p className="text-answered">+ {2.0}</p>
        </div>

        <div className="bg-red-200 rounded-lg px-2 py-1">
            <p className="text-notAnswered">- {0.5}</p>
        </div>
    </div>
  )
}

export default Marks