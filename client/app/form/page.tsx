'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { apiFetch } from '../../lib/api'
import Header from '../../components/ui/header'
import Button from '../../components/ui/button'
import { HiArrowSmLeft } from "react-icons/hi"
import { IQuestion } from '../../types/questions'

export default function Form() {
  const router = useRouter()
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    department: '',
    years: '',
    overallScore: null,
    comparation: '',
    comments: ''
  });
  const [answer, setAnswer] = useState([]);

  const fetchQuestions = async () => {
    try {
      const data = await apiFetch<IApiResponse<IQuestion[]>>('/questions');
      setError(null);
      setQuestions(data.result);
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

  useEffect(() => {
    fetchQuestions();
  }, []);

  const backToHome = () => {
    router.push('/')
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form, answer);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header title="Supervisor Review" imageSrc="/wooden-desk-pen-paper.png" />
      <main className="flex flex-col px-4 lg:px-8 py-8">
        <Button  
          className="self-start px-4 py-2 text-sm"
          variant="outline"
          color="black"
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
            <label htmlFor="firstName" className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                First Name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                id="firstName"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </label>
            <label htmlFor="lastName" className="flex flex-col">
              <span className="text-sm font-medium">
                Last Name <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                id="lastName"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <label htmlFor="department" className="flex flex-col">
              <span className="text-sm font-medium">
                Department <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                id="department"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <label htmlFor="years" className="flex flex-col">
              <span className="text-sm font-medium">
                How many years have you been with this company? <span className="text-red-500">*</span>
              </span>
              <input
                type="number"
                min={0}
                id="years"
                className="mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm p-2"
                onChange={(e) => setForm({ ...form, years: e.target.value })}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col">
              <span className="text-sm font-medium">
                How do you feel about management? <span className="text-red-500">*</span>
              </span>
              {questions && questions.length > 0 ? (
                <ul className="">
                  {questions.map((question) => (
                    <li key={question.id} className="p-1">
                      <p className="text-gray-700">{question.question}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No questions available.</p>
              )}
            </label>
          </div>
          <Button  
            className="self-start px-4 py-2 text-sm"
            variant="solid"
            color="green"
            type="submit"
          >
            <span className="flex items-center gap-2">
              Submit
            </span>
          </Button>
        </form>
      </main>
    </div>
  );
}