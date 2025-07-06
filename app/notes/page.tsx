"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Send, FileText, X } from "lucide-react"
import { marked } from "marked"

export default function NotesPage() {
  const [notes, setNotes] = useState("")
  const [renderedNotes, setRenderedNotes] = useState("")
  const [fileName, setFileName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)

    try {
      if (file.type === "application/pdf") {
        // In a real app, this would use a PDF parsing library
        // For this demo, we'll simulate PDF parsing with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const simulatedContent = `# Notes from ${file.name}\n\n## Chapter 1: Introduction\n\nThese are simulated notes extracted from your PDF file.\n\n## Chapter 2: Key Concepts\n\n- Important point 1\n- Important point 2\n- Important point 3\n\n## Chapter 3: Summary\n\nThis is a summary of the content.`
        setNotes(simulatedContent)
        renderMarkdown(simulatedContent)
      } else {
        // Handle text files
        const reader = new FileReader()
        reader.onload = (event) => {
          const content = event.target?.result as string
          setNotes(content)
          renderMarkdown(content)
        }
        reader.readAsText(file)
      }
    } catch (error) {
      console.error("Error processing file:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
    renderMarkdown(e.target.value)
  }

  const renderMarkdown = (text: string) => {
    try {
      setRenderedNotes(marked(text))
    } catch (error) {
      console.error("Error rendering markdown:", error)
    }
  }

  const sendToChat = () => {
    // Navigate to chat with notes as a parameter
    window.location.href = `/?notes=${encodeURIComponent(notes)}`
  }

  const clearFile = () => {
    setFileName("")
    setNotes("")
    setRenderedNotes("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-6">Notes Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-150px)]">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Input</h2>
            <label className="flex items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md">
              <Upload className="h-4 w-4" />
              <span>Upload PDF/Text</span>
              <input
                type="file"
                accept=".pdf,.txt,.md"
                className="hidden"
                onChange={handleFileUpload}
                ref={fileInputRef}
              />
            </label>
          </div>

          {fileName && (
            <div className="mb-2 flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{fileName}</span>
              </div>
              <button onClick={clearFile} className="text-gray-500 hover:text-red-500" aria-label="Remove file">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {isUploading ? (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm text-gray-500">Processing file...</p>
              </div>
            </div>
          ) : (
            <textarea
              value={notes}
              onChange={handleTextChange}
              placeholder="Type or paste your notes here, or upload a file..."
              className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
            />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Preview</h2>
            <button
              onClick={sendToChat}
              disabled={!notes}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              <span>Send to Chat</span>
            </button>
          </div>

          <div
            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-md overflow-auto bg-white dark:bg-gray-800 prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: renderedNotes || '<p class="text-gray-400">Markdown preview will appear here...</p>',
            }}
          />
        </div>
      </div>
    </div>
  )
}
