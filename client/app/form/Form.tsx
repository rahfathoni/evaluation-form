'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import ScaleTable from '@/components/ui/scale-table'
import Rating from '@/components/ui/rating'
import RadioGroup from '@/components/ui/radio-group'
import Textarea from '@/components/ui/textarea'
import { HiArrowSmLeft } from "react-icons/hi"
import { IQuestion, IAnswers } from '@/types/questions'
import { IEvaluationAddResponse } from '@/types/evaluation'


export default function Form() {
  const router = useRouter()
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    department: '',
    years: '' as string | number,
    overallScore: null as number | null,
    comparation: '',
    comments: ''
  })
  const [answers, setAnswers] = useState<IAnswers>({})

  const departmentOptions = [
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
  ]
  const comparationOptions = ["Much Better", "Better", "Same", "Worse", "Much Worse", "Don't Know"]

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const data = await apiFetch<IApiResponse<IQuestion[]>>('/questions')
      setError(null)
      setQuestions(data.result)
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
  
  const backToHome = () => {
    setLoading(true)
    router.push('/')
  }

  const submitForm = async () => {
    setLoading(true)

    const formattingAnswer = Object.entries(answers).map(([key, value]) => ({
      questionID: Number(key),
      point: value
    }))

    const request = {
      firstName: form.firstName,
      lastName: form.lastName,
      department: form.department,
      years: Number(form.years),
      overallScore: Number(form.overallScore),
      comparation: form.comparation,
      comment: form.comments,
      answers: formattingAnswer
    }

    try {
      const result = await apiFetch<IApiResponse<IEvaluationAddResponse>>("/evaluation/add", {
        method: "POST",
        body: JSON.stringify(request),
      })
      router.push('form/result/' + result.result.evaluation.id)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitForm()
  }

  useEffect(() => {
    fetchQuestions()
  }, [])
  
  return (
    <section className="flex flex-col px-4 lg:px-8 py-8">
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
      <form 
        className="flex flex-col gap-6 rounded-lg py-6 shadow-sm mt-6 bg-white px-4 md:px-8"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Input
            id="firstName"
            label="First Name"
            required
            value={form.firstName}
            disabled={loading}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Input
            id="lastName"
            label="Last Name"
            required
            value={form.lastName}
            disabled={loading}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Select
            id="department"
            label="Department"
            required
            value={form.department}
            disabled={loading}
            onChange={e => setForm({ ...form, department: e.target.value })}
            options={departmentOptions}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Input
            id="years"
            label="How many years have you been with this company?"
            required
            type="number"
            min={0}
            disabled={loading}
            value={form.years}
            onChange={(e) => setForm({ ...form, years: e.target.value ? Number(e.target.value) : '' })}
          />
        </div>
        <div>
          <ScaleTable
            questions={questions}
            value={answers}
            disabled={loading}
            label="How do you feel about management?"
            onChange={setAnswers}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Rating
            label="Overall, how do you rate the organization's management?"
            max={10}
            value={form.overallScore}
            disabled={loading}
            onChange={(val) => setForm({ ...form, overallScore: val })}
            start={1}
          />
        </div>
        <div>
          <RadioGroup
            label="How does this company's management compare to the management of other similar companies?"
            options={comparationOptions}
            name="management"
            value={form.comparation}
            disabled={loading}
            onChange={(val) => setForm({ ...form, comparation: val })}
            required
          />
        </div>
        <div>
          <Textarea
            label="Comments"
            name="feedback"
            disabled={loading}
            value={form.comments}
            placeholder="Type your comments here..."
            onChange={(val) => setForm({ ...form, comments: val })}
          />
        </div>
        <div className='flex justify-center mt-2'>
          <Button  
            className="self-start px-20 py-2 !text-lg !rounded-xl"
            variant="solid"
            color="green"
            type="submit"
            loading={loading}
          >
            <span className="flex items-center gap-2">
              Submit
            </span>
          </Button>
        </div>
      </form>
    </section>
  )
}