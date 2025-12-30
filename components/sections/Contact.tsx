"use client";
import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Button from "@/components/ui/Button";
import AntigravityBackground from "@/components/ui/AntigravityBackground";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name as keyof typeof errors]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/gabrielnathanael81@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Message from [${formData.name}]`,
            _captcha: "true",
            _template: "box",
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          "Message sent successfully! I'll get back to you as soon as possible."
        );

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Antigravity Particles Background */}
      <AntigravityBackground />

      <div id="contact" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Let&apos;s Create
            </span>
            <br />
            <span className="text-neutral-900 dark:text-white">
              Something Amazing
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Got a project in mind? Drop me a message and let&apos;s turn your
            ideas into reality.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 p-6 lg:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField("")}
                disabled={isSubmitting}
                className={`peer w-full px-4 pt-6 pb-2 bg-white dark:bg-black border-2 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-transparent focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.name
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400"
                }`}
                placeholder="Your Name"
              />
              <label
                htmlFor="name"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData.name || focusedField === "name"
                    ? "top-2 text-xs text-blue-600 dark:text-blue-400 font-semibold"
                    : "top-4 text-sm text-neutral-500 dark:text-neutral-400"
                } ${errors.name && "text-red-600 dark:text-red-400"}`}
              >
                Your Name
              </label>
              <div
                className={`absolute right-4 top-4 transition-opacity ${
                  formData.name || focusedField === "name"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <User
                  className={`h-5 w-5 ${
                    errors.name
                      ? "text-red-500"
                      : "text-blue-500 dark:text-blue-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                disabled={isSubmitting}
                className={`peer w-full px-4 pt-6 pb-2 bg-white dark:bg-black border-2 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-transparent focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400"
                }`}
                placeholder="Email Address"
              />
              <label
                htmlFor="email"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData.email || focusedField === "email"
                    ? "top-2 text-xs text-blue-600 dark:text-blue-400 font-semibold"
                    : "top-4 text-sm text-neutral-500 dark:text-neutral-400"
                } ${errors.email && "text-red-600 dark:text-red-400"}`}
              >
                Email Address
              </label>
              <div
                className={`absolute right-4 top-4 transition-opacity ${
                  formData.email || focusedField === "email"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <Mail
                  className={`h-5 w-5 ${
                    errors.email
                      ? "text-red-500"
                      : "text-blue-500 dark:text-blue-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Input */}
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField("")}
                disabled={isSubmitting}
                rows={5}
                className={`peer w-full px-4 pt-6 pb-2 bg-white dark:bg-black border-2 rounded-xl text-neutral-900 dark:text-neutral-100 placeholder-transparent focus:outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.message
                    ? "border-red-500 dark:border-red-500"
                    : "border-gray-300 dark:border-neutral-700 focus:border-blue-500 dark:focus:border-blue-400"
                }`}
                placeholder="Your Message"
              />
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                  formData.message || focusedField === "message"
                    ? "top-2 text-xs text-blue-600 dark:text-blue-400 font-semibold"
                    : "top-4 text-sm text-neutral-500 dark:text-neutral-400"
                } ${errors.message && "text-red-600 dark:text-red-400"}`}
              >
                Your Message
              </label>
              <div
                className={`absolute right-4 top-4 transition-opacity ${
                  formData.message || focusedField === "message"
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              >
                <MessageSquare
                  className={`h-5 w-5 ${
                    errors.message
                      ? "text-red-500"
                      : "text-blue-500 dark:text-blue-400"
                  }`}
                />
              </div>
              {errors.message && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full group relative overflow-visible"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  <span className="text-lg">Sending...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Send Message</span>
                  <div className="relative ml-3">
                    <Send className="w-5 h-5 absolute inset-0 rotate-45 opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-500" />
                    <Send className="w-5 h-5 absolute inset-0 rotate-45 opacity-0 group-hover:opacity-20 group-hover:translate-x-4 transition-all duration-700" />
                    <Send className="w-5 h-5 absolute inset-0 rotate-45 opacity-0 group-hover:opacity-10 group-hover:translate-x-6 transition-all duration-900" />

                    <Send className="w-5 h-5 relative rotate-45 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
