"use client";

import Card from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si";

const socials = [
  {
    name: "GitHub",
    icon: SiGithub,
    href: "https://github.com/GabrielNathanael",
    color: "hover:text-neutral-900 dark:hover:text-white",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    href: "https://instagram.com/gabrielnathanaelp",
    color: "hover:text-pink-600 dark:hover:text-pink-400",
  },
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/gabriel-nathanael-purba-549273376/",
    color: "hover:text-blue-600 dark:hover:text-blue-400",
  },
];

export default function SocialLinks() {
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
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            Connect With Me
          </h2>

          <p className="text-neutral-600 dark:text-neutral-400">
            Let&apos;s connect and build something amazing together!
          </p>

          <div className="space-y-4 pt-4">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-300 group ${social.color}`}
                >
                  <Icon className="w-8 h-8 text-neutral-600 dark:text-neutral-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-semibold text-neutral-700 dark:text-neutral-300">
                      {social.name}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
