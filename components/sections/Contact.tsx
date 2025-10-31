"use client";

import { Mail, Send } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="p-8 h-full" glass>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-900/40">
              <Mail className="w-6 h-6 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
          </div>

          <p className="text-neutral-600 dark:text-neutral-300">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>

          <form className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Gabriel Nathanel"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:border-violet-500 dark:focus:border-violet-400 focus:outline-none transition-colors resize-none"
              />
            </div>
            <Button variant="secondary" size="lg" className="w-full group">
              Send Message
              <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}
