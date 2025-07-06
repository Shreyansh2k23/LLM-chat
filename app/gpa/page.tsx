"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Trash, Calculator, X } from "lucide-react"

interface Course {
  id: string
  name: string
  credits: number
  grade: string
  points: number
}

interface GPAScenario {
  id: string
  name: string
  courses: Course[]
  gpa: number
}

const GRADES = [
  { label: "A", value: 4.0 },
  { label: "A-", value: 3.7 },
  { label: "B+", value: 3.3 },
  { label: "B", value: 3.0 },
  { label: "B-", value: 2.7 },
  { label: "C+", value: 2.3 },
  { label: "C", value: 2.0 },
  { label: "C-", value: 1.7 },
  { label: "D+", value: 1.3 },
  { label: "D", value: 1.0 },
  { label: "F", value: 0.0 },
]

export default function GPAPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Introduction to Computer Science", credits: 3, grade: "A", points: 4.0 },
    { id: "2", name: "Calculus I", credits: 4, grade: "B+", points: 3.3 },
  ])

  const [newCourse, setNewCourse] = useState<Omit<Course, "id" | "points">>({
    name: "",
    credits: 3,
    grade: "A",
  })

  const [gpa, setGPA] = useState(0)
  const [savedScenarios, setSavedScenarios] = useState<GPAScenario[]>([])
  const [scenarioName, setScenarioName] = useState("")
  const [showScenarioInput, setShowScenarioInput] = useState(false)
  const [whatIfMode, setWhatIfMode] = useState(false)
  const [targetGPA, setTargetGPA] = useState<number | "">("")
  const [requiredGrade, setRequiredGrade] = useState<string | null>(null)

  // Load saved scenarios from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("gpaScenarios")
    if (savedData) {
      try {
        setSavedScenarios(JSON.parse(savedData))
      } catch (e) {
        console.error("Error loading saved GPA scenarios:", e)
      }
    }
  }, [])

  // Calculate GPA whenever courses change
  useEffect(() => {
    if (courses.length === 0) {
      setGPA(0)
      return
    }

    const totalPoints = courses.reduce((sum, course) => sum + course.points * course.credits, 0)
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)

    setGPA(totalPoints / totalCredits)
  }, [courses])

  const addCourse = () => {
    if (!newCourse.name) return

    const gradePoints = GRADES.find((g) => g.label === newCourse.grade)?.value || 0

    setCourses([
      ...courses,
      {
        id: Date.now().toString(),
        ...newCourse,
        points: gradePoints,
      },
    ])

    setNewCourse({
      name: "",
      credits: 3,
      grade: "A",
    })
  }

  const removeCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const updateCourseGrade = (id: string, grade: string) => {
    setCourses(
      courses.map((course) => {
        if (course.id === id) {
          const gradePoints = GRADES.find((g) => g.label === grade)?.value || 0
          return { ...course, grade, points: gradePoints }
        }
        return course
      }),
    )
  }

  const saveScenario = () => {
    if (!scenarioName) return

    const newScenario: GPAScenario = {
      id: Date.now().toString(),
      name: scenarioName,
      courses: [...courses],
      gpa,
    }

    const updatedScenarios = [...savedScenarios, newScenario]
    setSavedScenarios(updatedScenarios)

    // Save to localStorage
    localStorage.setItem("gpaScenarios", JSON.stringify(updatedScenarios))

    setScenarioName("")
    setShowScenarioInput(false)
  }

  const loadScenario = (scenario: GPAScenario) => {
    setCourses(scenario.courses)
  }

  const deleteScenario = (id: string) => {
    const updatedScenarios = savedScenarios.filter((scenario) => scenario.id !== id)
    setSavedScenarios(updatedScenarios)
    localStorage.setItem("gpaScenarios", JSON.stringify(updatedScenarios))
  }

  const calculateRequiredGrade = () => {
    if (typeof targetGPA !== "number" || targetGPA <= 0 || courses.length === 0) {
      setRequiredGrade(null)
      return
    }

    // Calculate current total points and credits
    const currentTotalPoints = courses.reduce((sum, course) => sum + course.points * course.credits, 0)
    const currentTotalCredits = courses.reduce((sum, course) => sum + course.credits, 0)

    // Assume one more course with 3 credits
    const newCourseCredits = 3

    // Calculate required points for the new course
    // (targetGPA * (currentTotalCredits + newCourseCredits)) - currentTotalPoints = requiredPoints
    const requiredPoints =
      (targetGPA * (currentTotalCredits + newCourseCredits) - currentTotalPoints) / newCourseCredits

    // Find the closest grade
    let closestGrade = GRADES[0]
    for (const grade of GRADES) {
      if (grade.value >= requiredPoints) {
        closestGrade = grade
        break
      }
    }

    setRequiredGrade(`${closestGrade.label} (${closestGrade.value.toFixed(1)})`)
  }

  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-2xl font-bold mb-6">GPA Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Courses</h2>
            <div className="flex gap-2">
              {showScenarioInput ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="Scenario name"
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                  <button
                    onClick={saveScenario}
                    disabled={!scenarioName}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setShowScenarioInput(false)}
                    className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowScenarioInput(true)}
                  disabled={courses.length === 0}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Plan</span>
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-left p-2">Course Name</th>
                  <th className="text-center p-2">Credits</th>
                  <th className="text-center p-2">Grade</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-2">{course.name}</td>
                    <td className="text-center p-2">{course.credits}</td>
                    <td className="text-center p-2">
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourseGrade(course.id, e.target.value)}
                        className="p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                      >
                        {GRADES.map((grade) => (
                          <option key={grade.label} value={grade.label}>
                            {grade.label} ({grade.value.toFixed(1)})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center p-2">
                      <button onClick={() => removeCourse(course.id)} className="text-red-500 hover:text-red-700">
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {courses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-4 text-gray-500">
                      No courses added yet. Add a course below.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Course Name</label>
              <input
                type="text"
                value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                placeholder="e.g. Introduction to Psychology"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Credits</label>
              <select
                value={newCourse.credits}
                onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              >
                {[1, 2, 3, 4, 5].map((credit) => (
                  <option key={credit} value={credit}>
                    {credit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Grade</label>
              <select
                value={newCourse.grade}
                onChange={(e) => setNewCourse({ ...newCourse, grade: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
              >
                {GRADES.map((grade) => (
                  <option key={grade.label} value={grade.label}>
                    {grade.label} ({grade.value.toFixed(1)})
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4">
              <button
                onClick={addCourse}
                disabled={!newCourse.name}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
                <span>Add Course</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">GPA Summary</h2>

          <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
            <div className="text-sm text-gray-500 mb-1">Current GPA</div>
            <div className="text-4xl font-bold">{gpa.toFixed(2)}</div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setWhatIfMode(!whatIfMode)}
              className="w-full flex items-center justify-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 p-3 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <Calculator className="h-4 w-4" />
              <span>{whatIfMode ? "Hide GPA Calculator" : "What If Calculator"}</span>
            </button>

            {whatIfMode && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                <h3 className="font-medium mb-3">Target GPA Calculator</h3>
                <div className="mb-3">
                  <label className="block text-sm mb-1">Target GPA</label>
                  <input
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.1"
                    value={targetGPA}
                    onChange={(e) => setTargetGPA(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="e.g. 3.5"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                </div>
                <button
                  onClick={calculateRequiredGrade}
                  disabled={targetGPA === "" || courses.length === 0}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Required Grade
                </button>
                {requiredGrade && (
                  <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                    <p className="text-sm">
                      To achieve a {typeof targetGPA === "number" ? targetGPA.toFixed(2) : targetGPA} GPA, you need at
                      least:
                    </p>
                    <p className="font-bold text-lg">{requiredGrade}</p>
                    <p className="text-xs mt-1">in your next 3-credit course</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <h3 className="font-medium mb-2">Saved Plans</h3>
          {savedScenarios.length > 0 ? (
            <ul className="space-y-2 max-h-[300px] overflow-y-auto">
              {savedScenarios.map((scenario) => (
                <li key={scenario.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{scenario.name}</div>
                      <div className="text-sm text-gray-500">GPA: {scenario.gpa.toFixed(2)}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => loadScenario(scenario)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Load scenario"
                      >
                        <span className="sr-only">Load</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteScenario(scenario.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete scenario"
                      >
                        <span className="sr-only">Delete</span>
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">
              No plans saved yet. Use the "Save Plan" button to save your current GPA calculation.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
