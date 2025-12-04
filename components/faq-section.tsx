"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

type FAQItem = {
  id: string
  question: string
  answer: React.ReactNode
}

type FAQSectionProps = {
  title?: string
  subtitle?: string
  items?: FAQItem[]
  className?: string
}

const defaultItems: FAQItem[] = [
  {
    id: "1",
    question: "How do I add extras to my custom package?",
    answer:
      "Once you are ready to book me, you will get your very own custom portal, and it's as easy as amazon to add any extras to your package. You can of course always come back at any time and request additional extras before or after your wedding film.",
  },
  {
    id: "2",
    question: "Where are you available for filming?",
    answer:
      "Anywhere! I am based in Brisbane, but I regularly travel to Byron Bay, Toowomba the Sunshine Coast and the Gold Coast for wedding videos. I can travel anywhere in Queensland, interstate and internationally! Please request a custom quote if you have a destination wedding in mind.",
  },
  {
    id: "3",
    question: "Is there a travel fee?",
    answer:
      "For anywhere within 90 minutes of Brisbane I don't charge a travel fee. If your wedding destination is further afield please enquire about travel fees.",
  },
  {
    id: "4",
    question: "Do you offer Ceremony only videos or Part Day Videos?",
    answer:
      "Unfortunately not. For two reasons: 1. I am often booked far in advance and thus prefer to offer only full day packages. 2. Wedding couples I work with are so thankful that we capture every part of their wedding day and they can look back on every moment after their day. I don't want future couples to miss out on this!",
  },
  {
    id: "5",
    question: "Are you available for last minute wedding bookings?",
    answer:
      "The way my calendar fills up is a mystery to me! Often there are some dates that are left open and others which I end up having multiple requests for (first in best dressed!). My suggestion is to enquire with your wedding day and try your luck!",
  },
  {
    id: "6",
    question: "Do you offer photography?",
    answer:
      "I specialise in wedding videography, however I'm happy to team up with your preferred photographer for the day. I can also recommend to you a selection of awesome photographers who I have loved working with in the past.",
  },
  {
    id: "7",
    question: "How much do you charge?",
    answer:
      "I believe in being transparent. You can view all of my prices on the Packages page if you haven't already. Depending on your location there may be a small travel fee.",
  },
  {
    id: "8",
    question: "How many cameras do you use?",
    answer:
      "I use two cameras. I use one as a stationary camera on a tripod so I can capture multiple angles during the ceremony and speeches. The other camera is a 'roving' camera which I use to capture dynamic shots throughout the day.",
  },
  {
    id: "9",
    question: "Do you have a drone?",
    answer:
      "Yes! I use a DJI Mavic 2 Zoom. It is a super portable drone that allows me to get cinematic aerial images at almost any location. *Please note* that at some locations I may be unable to film aeirial footage due to CASA restrictions.",
  },
]

export const FAQSection = ({
  title = "Frequently asked questions",
  subtitle = "Everything you need to know about booking your wedding videographer.",
  items = defaultItems,
  className,
}: FAQSectionProps) => {
  return (
    <div className={cn("relative w-full overflow-hidden px-6 pt-0 pb-24 sm:pb-32 lg:px-8 bg-[#24221d]", className)}>
      <div className="mx-auto max-w-4xl">
        <Accordion className="w-full space-y-3" collapsible defaultValue="1" type="single">
          {items.map((item) => (
            <AccordionItem
              className="rounded-lg border border-[#b8a862]/20 bg-[#302d26] px-6 py-2 outline-none transition-all hover:border-[#b8a862]/40 data-[state=open]:border-[#b8a862] data-[state=open]:ring-2 data-[state=open]:ring-[#b8a862]/20"
              key={item.id}
              value={item.id}
            >
              <AccordionTrigger className="py-4 text-base md:text-lg font-serif text-[#F5F3ED] hover:no-underline hover:text-[#b8a862] transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 pt-2 text-base md:text-lg font-sans leading-relaxed text-[#C7C5BF]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <p className="text-base font-serif leading-7 text-[#F5F3ED]">
            Still have questions?{" "}
            <a
              href="/pricing#contact"
              className="text-[#b8a862] underline underline-offset-4 hover:text-[#d4c9a0] transition-colors"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
