'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import Button from '@/components/ui/button'
import FormDetail from '@/components/main/form-detail'
import { HiArrowSmLeft } from "react-icons/hi"
import { IEvaluation } from '@/types/evaluation'
import { IQuestion, IAnswers } from '@/types/questions'

interface FormDetailData {
  form: {
    firstName: string
    lastName: string
    department: string
    years: number | string
    overallScore: number | null
    comparation: string
    comments: string | null
  }
  answers: IAnswers
}

export default function Form() {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split('/').pop()

  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [mappedData, setMappedData] = useState<FormDetailData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const backToHome = () => {
    router.push('/')
  }

  const fetchData = async () => {
    if (!id) return
    setLoading(true)
    try {
      const questionsData = await apiFetch<IApiResponse<IQuestion[]>>('/questions')
      setQuestions(questionsData.result)

      const evaluationData = await apiFetch<IApiResponse<IEvaluation>>('/evaluation/' + id)
      const evaluation = evaluationData.result
      const mapped: FormDetailData = {
        form: {
          firstName: evaluation.first_name,
          lastName: evaluation.last_name,
          department: evaluation.department,
          years: evaluation.years,
          overallScore: evaluation.overall_score,
          comparation: evaluation.comparation,
          comments: evaluation.comment,
        },
        answers: evaluation.answers.reduce((acc, ans) => {
          acc[ans.questionID] = ans.point
          return acc
        }, {} as IAnswers)
      }

      setMappedData(mapped)
      setError(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  if (!id) return <p className="text-center mt-8 text-red-500">ID not found in URL</p>
  if (loading) return <p className="text-center mt-8">Loading...</p>
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>
  if (!mappedData) return null

  return (
    <section className="flex flex-col px-4 lg:px-8 justify-center items-center">
      <Button  
        className="self-start px-4 py-2 text-sm"
        variant="outline"
        color="black"
        loading={loading}
        onClick={backToHome}
      >
        <span className="flex items-center gap-2">
          <HiArrowSmLeft /> Back to Home
        </span>
      </Button>

      <p className="text-xl font-medium text-foreground mt-4">Here is the previous answer</p>

      <FormDetail
        form={mappedData.form}
        questions={questions}
        answers={mappedData.answers}
      />
    </section>
  )
}