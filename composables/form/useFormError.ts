export function useFormError() {
  type FormError = Partial<Record<string, string>>

  const initError: FormError = {}
  const formError = reactive<FormError>({ ...initError })
  const setFormError = (errors: Partial<FormError>) => {
    Object.keys(errors).forEach((key: string) => {
      formError[key] = errors[key] ?? ''
    })
  }
  const resetFormError = () => {
    Object.assign(formError, {})
  }
  return { formError, setFormError, resetFormError }
}
