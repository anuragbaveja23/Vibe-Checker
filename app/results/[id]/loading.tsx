import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-xl">
        <Loader2 className="h-12 w-12 text-violet-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-gray-800">Analyzing your vibe...</h2>
        <p className="text-gray-500 mt-2">Just a moment while we calculate your results</p>
      </div>
    </div>
  )
}
