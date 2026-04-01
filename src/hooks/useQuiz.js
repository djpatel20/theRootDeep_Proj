import { useState } from 'react'

export function useQuiz(questions) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState({})

  const selectAnswer = (questionId, optionIndex) => {
    if (submitted[questionId]) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
  }

  const submitAnswer = (questionId) => {
    if (answers[questionId] === undefined) return
    setSubmitted((prev) => ({ ...prev, [questionId]: true }))
  }

  const isCorrect = (questionId) => {
    const q = questions.find((q) => q.id === questionId)
    return q && answers[questionId] === q.correctIndex
  }

  const allSubmitted = questions.every((q) => submitted[q.id])

  return { answers, submitted, selectAnswer, submitAnswer, isCorrect, allSubmitted }
}