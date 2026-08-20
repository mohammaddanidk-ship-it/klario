import type { Metadata } from "next";
import { ClipboardPlus } from "lucide-react";
import { SEOLanding } from "@/components/seo/landing-template";

export const metadata: Metadata = {
  title: "Doctor Prescription Explained — Medicine, Dose & Instructions | Klarium",
  description: "Understand a doctor's prescription in plain language. Klarium helps identify medicines, strength, dosage instructions, timing, and common uses while clearly flagging uncertainty.",
  alternates: { canonical: "/doctor-prescription-explained" },
};

export default function Page() {
  return (
    <SEOLanding
      eyebrow="Doctor Prescription Explained"
      title="Understand your doctor's prescription clearly"
      subtitle="Prescription handwriting, medicine names, strengths, abbreviations, and dosing instructions can be difficult to read. Klarium helps organize what is visible and explains it in plain language without guessing when the prescription is unclear."
      icon={ClipboardPlus}
      problem="A prescription can contain medicine names, strengths, quantities, timing, duration, and shorthand that is difficult to understand. A wrong interpretation can be serious, so unclear text must be treated as uncertain rather than guessed."
      solutionPoints={[
        "Identify visible medicine names, strength, dosage instructions, frequency, and duration when they can be read reliably",
        "Explain the common purpose of each clearly identified medicine in plain language",
        "Separate what is clearly visible from what is uncertain or unreadable",
        "Never invent a medicine, dose, or instruction when the prescription image is unclear",
        "Explain the result in the language you choose and highlight what to confirm with your doctor or pharmacist",
      ]}
      faqs={[
        { q: "Can Klarium guarantee that it read my prescription correctly?", a: "No. A prescription image can be handwritten, blurred, cropped, or ambiguous. Klarium must not guess. Always confirm the medicine name and dose with your doctor or pharmacist before taking a medicine." },
        { q: "Can Klarium explain what a medicine is for?", a: "When the medicine name can be identified reliably, Klarium can explain its common use in plain language. That explanation does not confirm that the medicine is appropriate for your particular condition." },
        { q: "Can it read the dosage and timing?", a: "It can organize clearly visible instructions such as strength, amount, frequency, and duration. If any part is unclear, it should be marked uncertain rather than inferred." },
        { q: "Is this medical advice?", a: "No. Prescription interpretation is an informational aid. Do not change, start, stop, or combine medicines based only on an AI explanation. Confirm important instructions with a qualified healthcare professional." },
      ]}
      ctaLabel="Explain My Prescription"
    />
  );
}
