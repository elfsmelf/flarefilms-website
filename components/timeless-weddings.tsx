"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getSourcebusterData } from "@/components/sourcebuster-provider"

type FormData = {
  firstName: string
  lastName: string
  partnerName: string
  email: string
  contactNumber: string
  canCall: string
  weddingDate: Date | undefined
  weddingDetails: string
  weddingLocation: string
  foundUs: string
}

type TimelessWeddingsProps = {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  className?: string
}

export function TimelessWeddings({
  title = "LET'S CHAT!",
  description = "Fill out the contact form below to see if your date is still available. I will get back to you within 24 hours with some FULL galleries too!",
  imageUrl = "https://assets.guestsnapper.com/wedding-gallery-media/richard-photo-2.webp",
  imageAlt = "Couple portrait",
  className,
}: TimelessWeddingsProps = {}) {
  const router = useRouter()
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      partnerName: "",
      email: "",
      contactNumber: "",
      canCall: "",
      weddingDate: undefined,
      weddingDetails: "",
      weddingLocation: "",
      foundUs: "",
    },
  })

  function formatDate(date: Date | undefined) {
    if (!date) return ""
    return date.toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  async function onSubmit(values: FormData) {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Get sourcebuster tracking data
      const trackingData = getSourcebusterData()

      // Prepare the payload
      const payload = {
        // Form data
        firstName: values.firstName,
        lastName: values.lastName,
        partnerName: values.partnerName,
        email: values.email,
        contactNumber: values.contactNumber,
        canCall: values.canCall,
        weddingDate: values.weddingDate ? formatDate(values.weddingDate) : "",
        weddingDetails: values.weddingDetails,
        weddingLocation: values.weddingLocation,
        foundUs: values.foundUs,

        // Sourcebuster tracking data
        ...trackingData,

        // Additional metadata
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      }

      // Send to Make webhook
      const response = await fetch("https://hook.us1.make.com/hd6yj2gtmr62jrk5i4sfn7k26e2sbwg2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSubmitStatus("success")
        form.reset()
        router.push("/thank-you")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={cn("relative w-full overflow-hidden bg-[#24221D] py-24 md:py-32 lg:py-40", className)}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="https://assets.guestsnapper.com/wedding-gallery-media/ben-and-sierra-landscape.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#24221D]/80" />
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 h-full w-full pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 1060"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-[-10%] top-0 h-full w-auto opacity-20 md:opacity-100"
          preserveAspectRatio="none"
        >
          <path
            d="M1440 530C1440 530 1120 200 800 530C480 860 160 530 0 530"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="10 10"
            className="opacity-20"
          />
          <path
            d="M1200 -100 C 1300 200, 1100 400, 1300 600 S 1200 1000, 1400 1200"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="200"
            fill="none"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex flex-col items-center justify-center gap-16 lg:flex-row lg:gap-24">
          {/* Left Side: Image Composition */}
          <div className="relative w-full max-w-md lg:w-1/2 lg:max-w-none">
            {/* The Dark Overlay Card (Backdrop) */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut" as const,
                delay: 0.2,
              }}
              viewport={{
                once: true,
              }}
              className="absolute left-[20px] top-[20px] h-full w-full bg-[#302D26] sm:left-[40px] sm:top-[40px]"
            />

            {/* The Image Wrapper */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut" as const,
              }}
              viewport={{
                once: true,
              }}
              className="relative z-10 w-full overflow-hidden bg-gray-800 aspect-video"
            >
              <iframe
                src="https://www.youtube.com/embed/IYCMGWjvP_Q"
                title="Flare Films Wedding Videography"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative z-10 mt-12 space-y-6"
            >
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b8a862]/20 text-[#b8a862] font-serif font-semibold text-sm">
                    1
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl text-white mb-1">Fill out the contact form</h3>
                  <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed">
                    Tell me everything! We don't mind a novel.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b8a862]/20 text-[#b8a862] font-serif font-semibold text-sm">
                    2
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl text-white mb-1">Check your email</h3>
                  <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed">
                    I reply to emails within 24 hours if we are available or not. Then, find a spot in the calendar to book a call. It can be a zoom or phone call, just let me know.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#b8a862]/20 text-[#b8a862] font-serif font-semibold text-sm">
                    3
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg md:text-xl text-white mb-1">Bring your ideas and questions</h3>
                  <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed">
                    Let's make a plan on the call. These calls typically last around 40mins, so book that time into your calendar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form Content */}
          <div className="w-full max-w-md lg:w-1/2 lg:max-w-xl">
            <div className="flex flex-col items-start text-left">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-4 font-serif text-4xl font-light tracking-wide text-white sm:text-5xl lg:text-[48px] lg:leading-tight"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8 font-sans text-base md:text-lg leading-relaxed text-white/90"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/90">My first name is *</FormLabel>
                            <Input
                              placeholder="First name"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white/90">My last name is *</FormLabel>
                            <Input
                              placeholder="Last name"
                              value={field.value}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="partnerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">My partners name is *</FormLabel>
                          <Input
                            placeholder="Partner's name"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Our best email address is *</FormLabel>
                          <Input
                            type="email"
                            placeholder="email@example.com"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Our best contact number is *</FormLabel>
                          <Input
                            type="tel"
                            placeholder="Contact number"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="canCall"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white/90">Can I give you a call? *</FormLabel>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" className="border-white/20 text-white" />
                              <label htmlFor="yes" className="text-white/90 cursor-pointer">
                                Yes
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" className="border-white/20 text-white" />
                              <label htmlFor="no" className="text-white/90 cursor-pointer">
                                No
                              </label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weddingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Our wedding date is on *</FormLabel>
                          <div className="relative">
                            <Input
                              value={formatDate(field.value)}
                              placeholder="Select your wedding date"
                              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                              readOnly
                              onClick={() => setCalendarOpen(true)}
                            />
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="absolute top-1/2 right-2 size-6 -translate-y-1/2 hover:bg-white/10"
                                >
                                  <CalendarIcon className="size-4 text-white/70" />
                                  <span className="sr-only">Select date</span>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="end"
                                sideOffset={10}
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  captionLayout="dropdown"
                                  month={calendarMonth}
                                  onMonthChange={setCalendarMonth}
                                  startMonth={new Date()}
                                  endMonth={new Date(new Date().getFullYear() + 5, 11)}
                                  onSelect={(date) => {
                                    field.onChange(date)
                                    setCalendarOpen(false)
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weddingDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Tell me a little more about your wedding! *</FormLabel>
                          <Textarea
                            placeholder="Tell us about your wedding..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                            maxLength={5000}
                            {...field}
                          />
                          <div className="text-xs text-white/50">{(field.value || '').length}/5000</div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weddingLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Wedding location *</FormLabel>
                          <Input
                            placeholder="Wedding location"
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foundUs"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/90">Where did you guys find me? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white [&>span[data-placeholder]]:text-white/50">
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="facebook">Facebook</SelectItem>
                              <SelectItem value="google">Google</SelectItem>
                              <SelectItem value="instagram">Instagram</SelectItem>
                              <SelectItem value="online-directory">Online directory</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="event">Event</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>

                    {/* Success Message */}
                    {submitStatus === "success" && (
                      <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-center">
                        Thank you! Your enquiry has been submitted successfully. We'll be in touch within 24 hours.
                      </div>
                    )}

                    {/* Error Message */}
                    {submitStatus === "error" && (
                      <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-center">
                        Sorry, something went wrong. Please try again or email us directly.
                      </div>
                    )}
                  </form>
                </Form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
