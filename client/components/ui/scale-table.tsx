import { IQuestion, IAnswers } from "../../types/questions"

interface ScaleTableProps {
  questions: IQuestion[]
  value: IAnswers
  label?: string
  onChange: (answers: IAnswers) => void
  disabled?: boolean
}

const scaleOptions = [
  { value: 5, label: "Strongly Agree" },
  { value: 4, label: "Agree" },
  { value: 3, label: "Neutral" },
  { value: 2, label: "Disagree" },
  { value: 1, label: "Strongly Disagree" },
]

export default function ScaleTable({
  questions,
  value,
  label,
  onChange,
  disabled = false,
}: ScaleTableProps) {
  const handleChange = (qid: number, point: number) => {
    if (!disabled) {
      onChange({
        ...value,
        [qid]: point,
      })
    }
  }

  return (
    <div>
      <label className="flex flex-col">
        {label && (
          <span className="text-sm font-medium mb-2">
            {label} <span className="text-red-500">*</span>
          </span>
        )}
        {questions && questions.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-2"></th>
                {scaleOptions.map((opt) => (
                  <th
                    key={opt.value}
                    className="text-center text-sm font-bold p-2"
                  >
                    {opt.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((q) => (
                <tr key={q.id} className="border-t">
                  <td className="p-2 text-sm text-gray-700">{q.question}</td>
                  {scaleOptions.map((opt) => (
                    <td key={opt.value} className="text-center p-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.value}
                        checked={value[q.id] === opt.value}
                        onChange={() => handleChange(q.id, opt.value)}
                        disabled={disabled}
                        className={`${
                          disabled ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No questions available.</p>
        )}
      </label>
    </div>
  )
}