"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Message from "@/components/Chat/Message"
import Input from "@/components/Chat/Input"
// import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  id: string
  content: string
  isAI: boolean
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your CampusCopilot. How can I help you today?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const notesParam = searchParams.get("notes")

  // const genAI = new GoogleGenerativeAI("AIzaSyAUiN5ckva3kznQjy5NR4sZAQRVlYo3u34")
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const ai = new GoogleGenAI({ apiKey: "AIzaSyAUiN5ckva3kznQjy5NR4sZAQRVlYo3u34" });


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (notesParam) {
      const decodedNotes = decodeURIComponent(notesParam)
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `Here are my notes: ${decodedNotes.substring(0, 100)}${decodedNotes.length > 100 ? "..." : ""}`,
        isAI: false,
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMessage])
      handleSendMessage(`These are my notes: ${decodedNotes}`)
    }
  }, [notesParam])

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      isAI: false,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      const result =await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: content }] }],
      })

      const response = result.text;
      console.log(response)

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        isAI: true,
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Gemini API error:", error)

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: "❌ Failed to get a response from AI. Please try again later.",
          isAI: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }
  }

  return (
    <div className="chat-container h-screen">
      <div className="messages-container scrollbar-hide overflow-y-auto p-4">
        {messages.map((message) => (
          <Message key={message.id} content={message.content} isAI={message.isAI} timestamp={message.timestamp} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container p-4 border-t border-gray-200 dark:border-gray-700">
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}
