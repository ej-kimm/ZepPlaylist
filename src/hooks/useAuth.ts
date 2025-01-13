import { useState } from 'react'

type FormErrors = {
  [key: string]: string
}

export const useAuth = (initial: Record<string, string>) => {
  const [formData, setFormData] = useState(initial)
  const [error, setError] = useState<FormErrors>({})
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  const handleError = (field: string, message: string) => {
    setError((prev) => ({ ...prev, [field]: message }))
  }
  const resetError = () => {
    setError({})
  }
  return { resetError, handleError, error, handleChange, formData }
}
