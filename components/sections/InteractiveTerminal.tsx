// components/sections/InteractiveTerminal.tsx
"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  Terminal as TerminalIcon,
  ChevronRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Instagram,
  ExternalLink,
  User,
  Wrench,
  Briefcase,
  Award,
  MessageSquare,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Project, Certificate, Experience } from "@/lib/contentful/types";
import { techStack } from "@/lib/data/techstack";

const SITE_URL = "https://gabrielnathanael.site";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error";
  content: string | React.ReactNode;
  timestamp: Date;
}

interface InteractiveTerminalProps {
  projects?: Project[];
  certificates?: Certificate[];
  experience?: Experience | null;
}

const COMMAND_LIST = [
  { cmd: "help", desc: "Show available commands", icon: HelpCircle },
  { cmd: "about", desc: "Learn about me", icon: User },
  { cmd: "skills", desc: "View my tech stack", icon: Wrench },
  { cmd: "projects", desc: "Browse my projects", icon: Briefcase },
  { cmd: "experience", desc: "See work experience", icon: Briefcase },
  { cmd: "certificates", desc: "View certifications", icon: Award },
  { cmd: "contact", desc: "Get contact info", icon: MessageSquare },
  { cmd: "social", desc: "Find me online", icon: Globe },
  { cmd: "clear", desc: "Clear terminal", icon: TerminalIcon },
];

const TYPING_SPEED = 50; // ms per character

export default function InteractiveTerminal({
  projects = [],
  certificates = [],
  experience,
}: InteractiveTerminalProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Helper function to add lines - declared before useEffect
  const addLine = (
    type: "command" | "output" | "error",
    content: string | React.ReactNode,
  ) => {
    setLines((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type,
        content,
        timestamp: new Date(),
      },
    ]);
  };

  // Welcome message on mount
  useEffect(() => {
    if (inView && lines.length === 0) {
      addLine(
        "output",
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-bold">
              Welcome to Gabriel&apos;s Portfolio Terminal
            </span>
          </div>
          <div className="text-neutral-400 text-sm">
            Type <span className="text-blue-400 font-mono">help</span> to see
            available commands or click on suggestions below
          </div>
        </div>,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Command suggestions based on input
  useEffect(() => {
    if (currentInput.trim()) {
      const matches = COMMAND_LIST.filter((cmd) =>
        cmd.cmd.toLowerCase().startsWith(currentInput.toLowerCase()),
      ).map((cmd) => cmd.cmd);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  const typeCommand = async (command: string) => {
    setIsTyping(true);
    setCurrentInput("");

    // Type character by character
    for (let i = 0; i <= command.length; i++) {
      setCurrentInput(command.slice(0, i));
      await new Promise((resolve) => setTimeout(resolve, TYPING_SPEED));
    }

    setIsTyping(false);
    executeCommand(command);
    setCurrentInput("");
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add command to history
    if (trimmedCmd) {
      setCommandHistory((prev) => [...prev, trimmedCmd]);
      setHistoryIndex(-1);
      addLine("command", `$ ${trimmedCmd}`);
    }

    // Execute command
    switch (trimmedCmd) {
      case "help":
        addLine(
          "output",
          <div className="space-y-3">
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Available Commands
            </div>
            <div className="grid grid-cols-1 gap-2">
              {COMMAND_LIST.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <div
                    key={cmd.cmd}
                    className="flex items-start gap-3 text-sm hover:bg-neutral-800/50 p-2 rounded cursor-pointer transition-colors"
                    onClick={() => typeCommand(cmd.cmd)}
                  >
                    <Icon className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <span className="text-blue-400 font-mono min-w-25">
                      {cmd.cmd}
                    </span>
                    <span className="text-neutral-400">{cmd.desc}</span>
                  </div>
                );
              })}
            </div>
          </div>,
        );
        break;

      case "about":
        addLine(
          "output",
          <div className="space-y-3">
            <div className="text-cyan-400 font-semibold text-lg flex items-center gap-2">
              <User className="w-5 h-5" />
              About Gabriel
            </div>
            <div className="text-neutral-300 space-y-2 text-sm leading-relaxed">
              <p>
                Hey! I&apos;m Gabriel, a full stack developer and Computer
                Science student at Universitas Pendidikan Ganesha (Undiksha) in
                Bali.
              </p>
              <p>
                I build clean, scalable web applications using technologies like
                Next.js, React, Laravel, and TypeScript, with a focus on
                maintainable code and solid system design.
              </p>
              <p>
                Beyond application development, I explore DevOps, cloud
                fundamentals, and cybersecurity principles to build more
                reliable systems.
              </p>
            </div>
          </div>,
        );
        break;

      case "skills":
        addLine(
          "output",
          <div className="space-y-3">
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Tech Stack ({techStack.length} technologies)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {techStack.map((tech) => {
                const Icon = tech.icon;
                // Special handling for Next.js icon in light mode
                const iconColor =
                  tech.name === "Next.js"
                    ? "text-gray-900 dark:text-gray-100"
                    : tech.color;

                return (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 p-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 transition-colors group"
                  >
                    <Icon
                      className={`w-5 h-5 ${iconColor} ${tech.name === "Next.js" ? "invert dark:invert-0" : ""}`}
                    />
                    <span className="text-neutral-300 text-sm group-hover:text-white transition-colors">
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>,
        );
        break;

      case "projects":
        if (projects.length === 0) {
          addLine("output", "No projects data available.");
        } else {
          const displayProjects = projects.slice(0, 6);
          const hasMore = projects.length > 6;

          addLine(
            "output",
            <div className="space-y-3">
              <div className="text-cyan-400 font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Projects ({projects.length} total{hasMore ? ", showing 6" : ""})
              </div>
              <div className="space-y-3">
                {displayProjects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="p-3 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors border border-neutral-700/50"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="font-semibold text-blue-400">
                        {idx + 1}. {project.title}
                      </div>
                      <span className="text-xs px-2 py-1 bg-violet-500/20 text-violet-300 rounded">
                        {project.projectType}
                      </span>
                    </div>
                    <div className="text-neutral-400 text-sm mb-2">
                      {project.description}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="pt-2">
                  <Link
                    href="/projects"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="group-hover:underline">
                      View all projects at {SITE_URL}/projects
                    </span>
                  </Link>
                </div>
              )}
            </div>,
          );
        }
        break;

      case "experience":
        if (!experience) {
          addLine("output", "No experience data available.");
        } else {
          addLine(
            "output",
            <div className="space-y-3">
              <div className="text-cyan-400 font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Recent Experience
              </div>
              <div className="p-3 bg-neutral-800/50 rounded border border-neutral-700/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-semibold text-blue-400">
                    {experience.position}
                  </div>
                  {experience.iscurrent && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                      Current
                    </span>
                  )}
                </div>
                <div className="text-neutral-300 mb-1">
                  {experience.company}
                </div>
                <div className="text-neutral-500 text-sm mb-2">
                  {experience.startDate} -{" "}
                  {experience.iscurrent ? "Present" : experience.endDate}
                </div>
                <div className="text-neutral-400 text-sm">
                  {experience.description}
                </div>
              </div>
            </div>,
          );
        }
        break;

      case "certificates":
        if (certificates.length === 0) {
          addLine("output", "No certificates data available.");
        } else {
          const displayCerts = certificates.slice(0, 6);
          const hasMore = certificates.length > 6;

          addLine(
            "output",
            <div className="space-y-3">
              <div className="text-cyan-400 font-semibold flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certificates ({certificates.length} total
                {hasMore ? ", showing 6" : ""})
              </div>
              <div className="space-y-2">
                {displayCerts.map((cert, idx) => (
                  <div
                    key={cert.id}
                    className="p-3 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors border border-neutral-700/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-blue-400">
                          {idx + 1}. {cert.title}
                        </div>
                        <div className="text-neutral-400 text-sm">
                          {cert.issuer} • {cert.year}
                        </div>
                      </div>
                      {cert.highlight && (
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded">
                          ★
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="pt-2">
                  <Link
                    href="/certificates"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="group-hover:underline">
                      View all certificates at {SITE_URL}/certificates
                    </span>
                  </Link>
                </div>
              )}
            </div>,
          );
        }
        break;

      case "contact":
        addLine(
          "output",
          <div className="space-y-3">
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Contact Info
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <a
                  href="mailto:gabrielnathanael81@gmail.com"
                  className="text-neutral-300 hover:text-blue-400 transition-colors"
                >
                  gabrielnathanael81@gmail.com
                </a>
              </div>
              <div className="text-neutral-500 text-xs mt-3">
                Type <span className="text-blue-400 font-mono">social</span> to
                see all social links
              </div>
            </div>
          </div>,
        );
        break;

      case "social":
        addLine(
          "output",
          <div className="space-y-3">
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Find Me Online
            </div>
            <div className="space-y-2">
              <a
                href="https://github.com/GabrielNathanael"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors group"
              >
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                <span className="text-neutral-300 text-sm">
                  GitHub - GabrielNathanael
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500 ml-auto" />
              </a>
              <a
                href="https://www.linkedin.com/in/gabriel-nathanael-purba-549273376/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-blue-500 group-hover:text-blue-400" />
                <span className="text-neutral-300 text-sm">
                  LinkedIn - Gabriel Nathanael Purba
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500 ml-auto" />
              </a>
              <a
                href="https://www.instagram.com/gabrielnathanaelp?igsh=MXN5YXRqZ2Y0OXU0bw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-pink-500 group-hover:text-pink-400" />
                <span className="text-neutral-300 text-sm">
                  Instagram - @gabrielnathanaelp
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500 ml-auto" />
              </a>
              <a
                href="mailto:gabrielnathanael81@gmail.com"
                className="flex items-center gap-2 p-2 bg-neutral-800/50 rounded hover:bg-neutral-800 transition-colors group"
              >
                <Mail className="w-5 h-5 text-red-500 group-hover:text-red-400" />
                <span className="text-neutral-300 text-sm">
                  Email - gabrielnathanael81@gmail.com
                </span>
                <ExternalLink className="w-3 h-3 text-neutral-500 ml-auto" />
              </a>
            </div>
          </div>,
        );
        break;

      case "clear":
        setLines([]);
        break;

      case "":
        // Empty command, do nothing
        break;

      default:
        addLine(
          "error",
          <div className="text-red-400">
            Command not found: <span className="font-mono">{trimmedCmd}</span>
            <div className="text-neutral-500 text-sm mt-1">
              Type <span className="text-blue-400 font-mono">help</span> to see
              available commands
            </div>
          </div>,
        );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Enter: execute command
    if (e.key === "Enter" && !isTyping) {
      executeCommand(currentInput);
      setCurrentInput("");
      setSuggestions([]);
    }

    // Tab: autocomplete
    if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      setCurrentInput(suggestions[0]);
      setSuggestions([]);
    }

    // Arrow Up: previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    }

    // Arrow Down: next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-3"
        >
          <TerminalIcon className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
            Interactive Terminal
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-400"
        >
          Explore my portfolio through command line. Type or click commands
          below.
        </motion.p>
      </div>

      {/* Terminal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-neutral-700"
      >
        {/* Terminal Header */}
        <div className="bg-neutral-800 px-4 py-3 flex items-center gap-2 border-b border-neutral-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-neutral-400 text-sm font-mono">
            gabriel@portfolio:~
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          onClick={focusInput}
          className="p-4 h-125 overflow-y-auto font-mono text-sm cursor-text custom-scrollbar"
        >
          {/* Lines */}
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-3"
              >
                {line.type === "command" && (
                  <div className="flex items-center gap-2 text-green-400">
                    <ChevronRight className="w-4 h-4" />
                    <span>{line.content}</span>
                  </div>
                )}
                {line.type === "output" && (
                  <div className="ml-6 text-neutral-300">{line.content}</div>
                )}
                {line.type === "error" && (
                  <div className="ml-6">{line.content}</div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Input Line */}
          <div className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-green-400 shrink-0" />
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 bg-transparent outline-none text-neutral-100 caret-green-400"
              autoFocus
              spellCheck={false}
            />
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-green-400"
            />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="ml-6 mt-1 flex flex-wrap gap-2"
            >
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    typeCommand(suggestion);
                    setSuggestions([]);
                  }}
                  className="text-neutral-500 hover:text-blue-400 transition-colors text-sm font-mono"
                >
                  {suggestion}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Command Shortcuts */}
        <div className="bg-neutral-800 px-4 py-3 border-t border-neutral-700">
          <div className="flex flex-wrap gap-2">
            {COMMAND_LIST.slice(0, 6).map((cmd) => (
              <button
                key={cmd.cmd}
                onClick={() => typeCommand(cmd.cmd)}
                disabled={isTyping}
                className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-neutral-300 rounded text-xs font-mono transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cmd.cmd}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.08, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 0.08, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-linear-to-tr from-cyan-500 to-blue-400 rounded-full blur-3xl pointer-events-none"
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #171717;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #525252;
        }
      `}</style>
    </motion.div>
  );
}
