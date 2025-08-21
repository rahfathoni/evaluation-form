import type { Metadata } from "next"
import Header from "@/components/ui/header"
import Form from "./Form"

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for your review. Your feedback is valuable to us."
};

export default function FormPage() {
  return (
    <main className="flex flex-col">
      <Header title="Supervisor Review" imageSrc="/wooden-desk-pen-paper.png" />
      <section className="flex-1 mx-auto px-2 lg:px-4 py-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-2">Thank You!</h2>
        <p className="text-gray-700 mb-2">Your feedback is valuable to us.</p>
      </section>
      <Form />
    </main>
  )
}