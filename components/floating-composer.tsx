"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, Mic, Sparkles, X, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function FloatingComposer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSubmit = () => {
    if (prompt.trim()) {
      console.log("Submitting prompt:", prompt)
      setPrompt("")
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <MessageSquare className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Composer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 ${
              isExpanded
                ? "bottom-4 right-4 left-4 top-4 md:bottom-8 md:right-8 md:left-8 md:top-8"
                : "bottom-8 right-8 w-96"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">AI Composer</span>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Quick Prompts */}
              <div className="flex flex-wrap gap-2">
                {["Summarize", "Explain", "Rewrite", "Translate"].map((quickPrompt) => (
                  <Button
                    key={quickPrompt}
                    variant="outline"
                    size="sm"
                    onClick={() => setPrompt(quickPrompt + ": ")}
                    className="text-xs hover:bg-orange-50 hover:border-orange-300"
                  >
                    {quickPrompt}
                  </Button>
                ))}
              </div>

              {/* Textarea */}
              <div className="relative">
                <Textarea
                  placeholder="Describe what you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className={`resize-none border-gray-200 focus:border-orange-300 focus:ring-orange-200 ${
                    isExpanded ? "min-h-[200px]" : "min-h-[100px]"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      handleSubmit()
                    }
                  }}
                />

                {/* Character Count */}
                <div className="absolute bottom-2 left-2 text-xs text-gray-400">{prompt.length}/2000</div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleVoiceInput}
                    className={`${
                      isListening
                        ? "bg-red-50 border-red-300 text-red-600"
                        : "hover:bg-orange-50 hover:border-orange-300"
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    {isListening && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="w-2 h-2 bg-red-500 rounded-full ml-1"
                      />
                    )}
                  </Button>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Generate
                </Button>
              </div>

              {/* Usage Stats */}
              <div className="text-xs text-gray-500 flex justify-between pt-2 border-t border-gray-100">
                <span>Words today: 1,247</span>
                <span>⌘K for quick access</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
