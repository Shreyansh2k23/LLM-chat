"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

interface InputProps {
  onSendMessage: (message: string) => void
}

export default function Input({ onSendMessage }: InputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-md border border-gray-300 dark:border-gray-200 bg-white dark:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  )
}


// "use client"

// import { useState } from "react"
// import { Send } from "lucide-react"
// import { GoogleGenerativeAI } from "@google/generative-ai"

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

// if (!apiKey) {
//   throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables.")
// }

// const genAI = new GoogleGenerativeAI(apiKey)

// export async function generateGeminiResponse(prompt: string): Promise<string> {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" })

//     // Use startChat instead of generateContent
//     const chat = model.startChat({
//       history: [], // you can add chat history here if needed
//       generationConfig: {
//         temperature: 0.7,
//       },
//     })

//     const result = await chat.sendMessage(prompt)
//     const response = await result.response
//     return response.text()
//   } catch (error) {
//     console.error("Gemini API error:", error)
//     return "Sorry, I couldn't generate a response."
//   }
// }


// interface InputProps {
//   onSendMessage: (message: string) => void
// }

// export default function Input({ onSendMessage }: InputProps) {
//   const [message, setMessage] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!message.trim()) return

//     onSendMessage(message.trim())
//     setMessage("")
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         className="flex-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="submit"
//         className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//         disabled={!message.trim()}
//       >
//         <Send className="h-5 w-5" />
//       </button>
//     </form>
//   )
// }



// lib/gemini.ts


// "use client"

// import { useState } from "react"
// import { Send } from "lucide-react"
// import { GoogleGenerativeAI } from "@google/generative-ai"

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

// if (!apiKey) {
//   throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables.")
// }

// const genAI = new GoogleGenerativeAI(apiKey)

// export async function generateGeminiResponse(prompt: string): Promise<string> {
//   try {
//     const model = genAI.getGenerativeModel({ model: "models/chat-bison-001" }) // ✅ use supported model

//     const chat = model.startChat({
//       history: [],
//       generationConfig: {
//         temperature: 0.7,
//       },
//     })

//     const result = await chat.sendMessage(prompt)
//     const response = await result.response
//     return response.text()
//   } catch (error) {
//     console.error("Gemini API error:", error)
//     return "Sorry, I couldn't generate a response."
//   }
// }

// interface InputProps {
//   onSendMessage: (message: string) => void
// }

// export default function Input({ onSendMessage }: InputProps) {
//   const [message, setMessage] = useState("")

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!message.trim()) return

//     onSendMessage(message.trim())
//     setMessage("")
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message..."
//         className="flex-1 p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <button
//         type="submit"
//         className="p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
//         disabled={!message.trim()}
//       >
//         <Send className="h-5 w-5" />
//       </button>
//     </form>
//   )
// }
