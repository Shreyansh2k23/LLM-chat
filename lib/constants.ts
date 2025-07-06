import { Home, BookOpen, GraduationCap, Map, Calculator } from "lucide-react"

export const NAV_ITEMS = [
  {
    name: "Chat",
    href: "/",
    icon: Home,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: BookOpen,
  },
  {
    name: "Exams",
    href: "/exams",
    icon: GraduationCap,
  },
  {
    name: "Map",
    href: "/map",
    icon: Map,
  },
  {
    name: "GPA",
    href: "/gpa",
    icon: Calculator,
  },
]

export const SIDEBAR_WIDTH = 240
export const SIDEBAR_COLLAPSED_WIDTH = 24
export const TRANSITION_DURATION = 300

// Campus map data
export const BUILDINGS = [
  { id: "lib", name: "Library", x: 100, y: 150, width: 80, height: 60 },
  { id: "sci", name: "Science Building", x: 220, y: 100, width: 100, height: 80 },
  { id: "cafe", name: "Cafeteria", x: 150, y: 250, width: 70, height: 50 },
  { id: "dorm", name: "Dormitory", x: 350, y: 200, width: 120, height: 90 },
  { id: "gym", name: "Gymnasium", x: 300, y: 350, width: 100, height: 70 },
  { id: "admin", name: "Administration", x: 50, y: 50, width: 90, height: 70 },
  { id: "eng", name: "Engineering", x: 400, y: 100, width: 110, height: 80 },
  { id: "arts", name: "Arts Center", x: 200, y: 400, width: 90, height: 60 },
]

// Graph representation for pathfinding
export const BUILDING_CONNECTIONS = [
  { from: "lib", to: "sci", distance: 150 },
  { from: "lib", to: "cafe", distance: 120 },
  { from: "lib", to: "admin", distance: 200 },
  { from: "sci", to: "eng", distance: 180 },
  { from: "sci", to: "cafe", distance: 160 },
  { from: "cafe", to: "dorm", distance: 220 },
  { from: "cafe", to: "gym", distance: 190 },
  { from: "dorm", to: "eng", distance: 150 },
  { from: "dorm", to: "gym", distance: 170 },
  { from: "gym", to: "arts", distance: 160 },
  { from: "admin", to: "sci", distance: 170 },
  { from: "eng", to: "gym", distance: 210 },
  { from: "arts", to: "cafe", distance: 180 },
  { from: "arts", to: "gym", distance: 130 },
]

// Sample exam data
export const SUBJECTS = [
  { id: "math", name: "Mathematics" },
  { id: "ml", name: "Machine Learning" },
  { id: "dbms", name: "Database Management System" },
  { id: "ds", name: "Data Structures" },
  { id: "coa", name: "Computer Organization & Architecture" },
  { id: "cn", name: "Computer Networks" },
  { id: "se", name: "Software Engineering" },
]

export const EXAM_TOPICS = {
  math: [
    { topic: "Calculus", probability: 85 },
    { topic: "Linear Algebra", probability: 70 },
    { topic: "Statistics", probability: 60 },
    { topic: "Discrete Mathematics", probability: 45 },
    { topic: "Number Theory", probability: 30 },
  ],
  ml: [
    { topic: "Supervised Learning (Regression, Classification)", probability: 80 },
  { topic: "Unsupervised Learning (Clustering, PCA)", probability: 75 },
  { topic: "Model Evaluation Metrics (Accuracy, Precision, Recall)", probability: 70 },
  { topic: "Overfitting, Underfitting & Regularization", probability: 68 },
  { topic: "Gradient Descent & Cost Function", probability: 72 },
  ],
  dbms: [
      { topic: "Normalization in DBMS", probability: 75 },
      { topic: "ER Diagrams & Relational Models", probability: 70 },
      { topic: "Transactions & Concurrency Control", probability: 60 },
      { topic: "Indexing and File Organization", probability: 65 },
      { topic: "SQL Queries & Joins", probability: 80 },
  ],
  ds: [
    { topic: "Stacks & Queues", probability: 80 },
  { topic: "Trees (Binary, BST, AVL)", probability: 85 },
  { topic: "Graphs & Traversal Algorithms", probability: 75 },
  { topic: "Hashing & Hash Tables", probability: 70 },
  { topic: "Searching & Sorting Algorithms", probability: 78 },
  ],
  coa: [
    { topic: "Instruction Cycle & Addressing Modes", probability: 78 },
    { topic: "Pipelining & Hazards", probability: 72 },
    { topic: "Memory Hierarchy (Cache, Virtual Memory)", probability: 70 },
    { topic: "ALU Design & Control Unit", probability: 65 },
    { topic: "Number Systems & Binary Arithmetic", probability: 75 },
  ],
  cn: [
    { topic: "OSI Model", probability: 78 },
  { topic: "TCP/IP Protocol Suite", probability: 72 },
  { topic: "Congestion Control", probability: 68 },
  { topic: "Routing Algorithms", probability: 65 },
  { topic: "MAC Layer & Ethernet", probability: 70 },
  ],
  se: [
    { topic: "Software Development Life Cycle (SDLC)", probability: 80 },
  { topic: "Agile & Scrum Methodologies", probability: 70 },
  { topic: "Software Testing (Unit, Integration, System)", probability: 75 },
  { topic: "Requirement Engineering & SRS", probability: 68 },
  { topic: "Design Patterns & Architecture", probability: 65 },
  ],
}
