import { useState } from 'react'

const useFormFields = (initialState) => {
  const [formFields, setFormFields] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormFields(initialState)
  }

  return { formFields, handleChange, resetForm }
}

export default useFormFields
