"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Brain, Mic, Trophy, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesSection() {
  const features = [
    {
      title: "Voice-Powered Practice",
      description:
        "Practice with AI-generated questions using text-to-speech technology for realistic interview experience.",
      icon: <Mic className="h-6 w-6" />,
    },
    {
      title: "AI Feedback Analysis",
      description:
        "Get real-time analysis and feedback on your coding explanations and interview responses.",
      icon: <Brain className="h-6 w-6" />,
    },
    {
      title: "Gamified Learning",
      description:
        "Level up your interview skills through engaging gamification and progress tracking.",
      icon: <Trophy className="h-6 w-6" />,
    },
    {
      title: "Personalized Questions",
      description:
        "Receive tailored interview questions based on your unique profile and goals.",
      icon: <User className="h-6 w-6" />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="features" className="w-full py-5 md:py-5 ">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need to Succeed
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Our comprehensive platform provides all the tools you need to
            streamline your workflow, boost productivity, and achieve your
            goals.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full overflow-hidden border border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-lg">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
