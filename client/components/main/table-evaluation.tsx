import { IEvaluation } from "@/types/evaluation"

interface TableEvaluationProps {
  evaluations: IEvaluation[]
  renderAction?: (evaluation: IEvaluation) => React.ReactNode
}

export default function TableEvaluation({ evaluations, renderAction }: TableEvaluationProps) {
  if (!evaluations || evaluations.length === 0) {
    return <p className="text-gray-500 text-center text-sm">No evaluations available.</p>
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-[1000px] border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">No</th>
            {renderAction && <th className="p-2 border">Action</th>}
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Last Name</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Years</th>
            <th className="p-2 border">Management Score</th>
            <th className="p-2 border">Overall Score</th>
            <th className="p-2 border">Company Comparation</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border">Comment</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((e, i) => (
            <tr key={e.id} className="hover:bg-gray-50">
              <td className="p-2 border">{i + 1}</td>
              {renderAction && <td className="p-2 border">{renderAction(e)}</td>}
              <td className="p-2 border">{e.first_name}</td>
              <td className="p-2 border">{e.last_name}</td>
              <td className="p-2 border">{e.department}</td>
              <td className="p-2 border">{e.years}</td>
              <td className="p-2 border">{e.score}</td>
              <td className="p-2 border">{e.overall_score}</td>
              <td className="p-2 border">{e.comparation}</td>
              <td className="p-2 border">{new Date(e.createdAt).toLocaleDateString()}</td>
              <td className="p-2 border">{e.comment ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}