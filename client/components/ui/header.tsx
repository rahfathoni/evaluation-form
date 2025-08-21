import Image from "next/image"

interface HeaderProps {
  title?: string
  imageSrc?: string
}

export default function Header({ title, imageSrc }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={`${imageSrc ?? "/header-bg.jpg"}`}
          alt="header image background"
          fill
          className="object-cover opacity-header"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold">{title ?? "Supervisor Evaluation"}</h1>
      </div>
    </header>
  );
}