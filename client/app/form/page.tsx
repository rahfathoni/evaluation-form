import type { Metadata } from "next"
import Header from "@/components/ui/header"
import Form from "./Form"

export const metadata: Metadata = {
  title: "Form",
  description: "Submit your supervisor evaluation form"
};

export default function FormPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header title="Supervisor Review" imageSrc="/wooden-desk-pen-paper.png" />
      <Form />
    </main>
  )
}