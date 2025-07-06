
import ReactMarkdown from 'react-markdown';
interface MessageProps {
  content: string
  isAI: boolean
  timestamp: string
}
export default function Message({ content, isAI, timestamp }: MessageProps) {
  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} mb-4`}>
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`w-full max-w-[100%] p-4 rounded-lg ${isAI ? "bg-gray-100 dark:bg-gray-700" : "bg-blue-500 text-white"}`}
        >
          <ReactMarkdown>
          {content}
          </ReactMarkdown>
         
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  )
}

