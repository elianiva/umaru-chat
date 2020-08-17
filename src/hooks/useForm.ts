import { useState } from "react"

type AnyObject = { [key: string]: string }

export const useForm = (initialValue: AnyObject) => {
  const [values, setValues] = useState<AnyObject>(initialValue)

  const handleChange = (name: string, value: string) => {
    setValues({ ...values, [name]: value })
  }

  return [values, handleChange] as const
}
