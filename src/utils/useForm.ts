import { useState } from "react"

export const useForm = <T>(initialValue: T) => {
  const [values, setValues] = useState<T>(initialValue)

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value })
  }

  return [values, handleChange] as const
}
