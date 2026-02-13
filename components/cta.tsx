import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Placeholder Text</h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Placeholder Text
        </p>
        <Button
          size="lg"
          className="
            bg-primary text-primary-foreground border border-primary
            hover:bg-transparent hover:text-primary hover:border-primary/60
            hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]
            hover:brightness-110
            transition-all duration-300 ease-out
            font-semibold
            rounded-md px-8 py-6 min-w-[220px]
          "
        >
          Placeholder Text
        </Button>
      </div>
    </section>
  )
}