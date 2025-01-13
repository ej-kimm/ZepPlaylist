import { useState } from 'react'

export const useAuth = (initial: Record<string, string>) => {
  const [formData, setFormData] = useState(initial)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return { handleChange, formData }
}
