import { HOW_IT_WORKS } from "../constants/content";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="px-4 py-20 md:px-6 md:py-28">
      <SectionHeading
        eyebrow="Effortless"
        title="Three steps to “I do”"
        description="From first click to shared invitation in minutes."
      />

      <ol className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-3">
        {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
          <Reveal key={step} delay={i * 0.12}>
            <li className="relative flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-rosegold/40 bg-blush/50 font-heading text-lg font-semibold text-accent">
                {step}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{desc}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
