import { addHours } from 'date-fns'
import { useEffect } from 'react'
import { useState } from 'react'

export const useReport = ({
  formMethods,
  frequencyOptions,
  initialFormOptions,
  filename = 'reporte'
}) => {
  const [showAllRows, setShowAllRows] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const handleShowRows = () => setShowAllRows(!showAllRows)

  const watchValues = formMethods.watch()

  const nameCriteria = frequencyOptions.find(
    ({ id }) => id === watchValues.options.criterio
  )?.name

  const completeFileName = `${filename}-${nameCriteria}`

  const hasOptionsByDefault = () => {
    const { options: selectedOptions } = watchValues
    const selectedValues = Object.values(selectedOptions)
    const initialFormValues = Object.values(initialFormOptions)

    return selectedValues.some((selectedValue) =>
      initialFormValues.includes(selectedValue)
    )
  }

  useEffect(() => {
    let dateStart
    let dateEnd = new Date()

    if (hasOptionsByDefault()) return
    const { criterio, orderBy } = watchValues.options

    if (criterio !== '5') {
      const selectedCriteria = frequencyOptions.find(
        ({ id }) => id === criterio
      )
      dateStart = selectedCriteria.dateStart?.toISOString()
      dateEnd = selectedCriteria.dateEnd?.toISOString()
    } else {
      dateStart = watchValues.dateStart
      dateEnd = watchValues.dateEnd
    }

    if (!dateStart || !dateEnd) return

    const dateEndMoreHr = addHours(new Date(dateEnd), 1).toISOString()

    const url = `/?dateStart=${dateStart}&dateEnd=${dateEndMoreHr}&orderBy=${orderBy}`

    setSearchTerm(url)
  }, [watchValues])

  return {
    fileName: completeFileName,
    showAllRows,
    handleShowRows,
    searchTerm
  }
}
