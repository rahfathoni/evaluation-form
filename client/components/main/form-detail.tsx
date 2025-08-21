'use client'

import Input from '../ui/input'
import Select from '../ui/select'
import ScaleTable from '../ui/scale-table'
import Rating from '../ui/rating'
import RadioGroup from '../ui/radio-group'
import Textarea from '../ui/textarea'
import { IQuestion, IAnswers } from '@/types/questions'

interface FormProps {
  form: {
    firstName: string
    lastName: string
    department: string
    years: number | string
    overallScore: number | null
    comparation: string
    comments: string | null
  }
  questions: IQuestion[]
  answers: IAnswers
}

export default function FormDetail({ form, questions = [], answers = {} }: FormProps) {
  const departmentOptions = [
    { value: 'Human Resources', label: 'Human Resources' },
    { value: 'IT', label: 'IT' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Marketing', label: 'Marketing' },
  ]
  const comparationOptions = [
    "Much Better",
    "Better",
    "Same",
    "Worse",
    "Much Worse",
    "Don't Know"
  ]

  return (
    <section className="flex flex-col gap-6 rounded-lg py-6 shadow-sm mt-6 bg-white px-4 md:px-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <Input
          id="firstName"
          label="First Name"
          required
          disabled
          value={form.firstName}
          onChange={() => {}}
        />
        <Input
          id="lastName"
          label="Last Name"
          required
          disabled
          value={form.lastName}
          onChange={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Select
          id="department"
          label="Department"
          required
          disabled
          value={form.department}
          onChange={() => {}}
          options={departmentOptions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Input
          id="years"
          label="How many years have you been with this company?"
          required
          disabled
          type="number"
          min={0}
          value={form.years}
          onChange={() => {}}
        />
      </div>

      <div>
        <ScaleTable
          questions={questions}
          value={answers}
          disabled
          label="How do you feel about management?"
          onChange={() => {}}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <Rating
          label="Overall, how do you rate the organization's management?"
          max={10}
          value={form.overallScore}
          disabled
          onChange={() => {}}
          start={1}
        />
      </div>

      <div>
        <RadioGroup
          label="How does this company's management compare to the management of other similar companies?"
          options={comparationOptions}
          name="management"
          disabled
          value={form.comparation}
          onChange={() => {}}
          required
        />
      </div>

      <div>
        <Textarea
          label="Comments"
          name="feedback"
          disabled
          value={form.comments}
          placeholder="Type your comments here..."
          onChange={() => {}}
        />
      </div>
    </section>
  )
}
