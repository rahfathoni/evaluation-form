'use client'

import Header from '../components/ui/header'
import Button from '../components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { apiFetch } from '../lib/api'
import { IEvaluation } from "../types/evaluation";

export default function Home() {
  const router = useRouter()
  const [showResult, setShowResult] = useState(false)
  const [evaluations, setEvaluations] = useState<IEvaluation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvaluation = async () => {
    setLoading(true)
    try {
      const data = await apiFetch<IApiResponse<IEvaluation[]>>('/evaluation');
      setError(null);
      setEvaluations(data.result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  };

  const goToForm = () => {
    router.push('/form');
  }

  const handlerShowResult = () => {
    if (!showResult) fetchEvaluation()
    setShowResult(!showResult)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Simulation Evaluation Form" imageSrc="/header-bg.jpg" />
      <main className="flex-1 mx-auto px-2 lg:px-4 py-8  text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">Welcome to the Evaluation Form</h2>
        <p className="text-gray-700">This is a template for Evaluation Form created with Next.js.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="mt-6" 
            variant="solid"
            color="green"
            onClick={goToForm}
          >
            Go To Form
          </Button>
          <Button 
            className="mt-6" 
            variant={showResult ? "solid" : "outline"}
            color="black"
            onClick={handlerShowResult}
          >
            {showResult ? 'Hide Result' : 'Show Result'}
          </Button>
        </div>
        {showResult && (
          <div className='mt-8'>
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && evaluations.length === 0 && (
              <p className="text-gray-500">No evaluations available.</p>
            )}
            {evaluations && !error && !loading && (
              <ul className="">
                {evaluations.map((evaluation) => (
                  <li key={evaluation.id} className="p-4">
                    <p className="text-gray-700">{evaluation.first_name} | {evaluation.last_name} | {evaluation.score}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
