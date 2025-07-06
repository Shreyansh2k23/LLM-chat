"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, X } from "lucide-react"
import { SUBJECTS, EXAM_TOPICS } from "@/lib/constants"
import ProbabilityChart from "@/components/Exams/ProbabilityChart"

export default function ExamsPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [topics, setTopics] = useState<{ topic: string; probability: number }[]>([])
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId)

    // Get topics for selected subject
    if (subjectId in EXAM_TOPICS) {
      setTopics(EXAM_TOPICS[subjectId as keyof typeof EXAM_TOPICS])
    } else {
      setTopics([])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadedFile(file.name)
    setIsAnalyzing(true)

    // Simulate file analysis
    setTimeout(() => {
      // Generate random topic probabilities
      const randomTopics = [
        { topic: "Topic 1", probability: Math.floor(Math.random() * 40) + 60 },
        { topic: "Topic 2", probability: Math.floor(Math.random() * 40) + 50 },
        { topic: "Topic 3", probability: Math.floor(Math.random() * 40) + 40 },
        { topic: "Topic 4", probability: Math.floor(Math.random() * 40) + 30 },
        { topic: "Topic 5", probability: Math.floor(Math.random() * 40) + 20 },
      ]

      setTopics(randomTopics)
      setIsAnalyzing(false)
      setSelectedSubject(null) // Clear selected subject
    }, 1500)
  }

  const clearFile = () => {
    setUploadedFile(null)
    if (!selectedSubject) {
      setTopics([])
    }
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-6">Exam Predictor</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Select Subject</h2>

          <div className="space-y-2 mb-6">
            {SUBJECTS.map((subject) => (
              <button
                key={subject.id}
                onClick={() => handleSubjectChange(subject.id)}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                  selectedSubject === subject.id
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-medium mb-2">Or Upload Past Papers</h3>
            <label className="flex items-center justify-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md w-full">
              <Upload className="h-4 w-4" />
              <span>Upload Paper</span>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
            </label>

            {uploadedFile && (
              <div className="mt-3 flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm truncate max-w-[150px]">{uploadedFile}</span>
                </div>
                <button onClick={clearFile} className="text-gray-500 hover:text-red-500" aria-label="Remove file">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">
            Topic Probability Predictions
            {selectedSubject && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({SUBJECTS.find((s) => s.id === selectedSubject)?.name})
              </span>
            )}
            {uploadedFile && !selectedSubject && (
              <span className="ml-2 text-sm font-normal text-gray-500">(Based on uploaded paper)</span>
            )}
          </h2>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500">Analyzing paper...</p>
            </div>
          ) : topics.length > 0 ? (
            <ProbabilityChart topics={topics} />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>Select a subject or upload a past paper to see predictions</p>
            </div>
          )}

          {topics.length > 0 && (
            <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-medium mb-2">Study Recommendations</h3>
              <ul className="space-y-2">
                {topics.slice(0, 3).map((topic) => (
                  <li key={topic.topic} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span>
                      Focus on <strong>{topic.topic}</strong> ({topic.probability}% probability)
                    </span>
                  </li>
                ))}
                <li className="flex items-center text-blue-600 dark:text-blue-400">
                  <span>See our AI Chat for personalized study plans</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
