import { useState } from "preact/hooks"

export const useForm = () => {
  const [values, setValues] = useState<{ [key: string]: string }>({})

  const handleChange = (e: InputEvent) => {
    setValues(values => ({
      ...values,
      [(e?.target as HTMLInputElement)?.name]: (e?.target as HTMLInputElement)
        ?.value
    }))
  }

  return [values, handleChange] as const
}
