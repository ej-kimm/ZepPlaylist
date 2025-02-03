import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputBoxProps<T extends FieldValues> = {
  name: Path<T>
  type: string
  placeholder: string
  register: UseFormRegister<T>
  errorMessage?: string
  required: boolean
  isTextArea?: boolean
  className?: string
}
const InputBox = <T extends FieldValues>({
  name,
  type = 'text',
  placeholder,
  register,
  errorMessage,
  required = false,
  isTextArea = false,
  className = '',
}: InputBoxProps<T>) => {
  const inputClass = `w-full rounded-lg border p-3 focus:outline-none focus:ring-2 cursor-text desktop:w-[532px] ${
    errorMessage
      ? 'border-red-500 focus:ring-red-500'
      : 'border-gray-300 focus:ring-purple-500'
  } ${className}`
  return (
    <div>
      {!isTextArea ? (
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          {...register(name)}
          className={inputClass}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          required={required}
          {...register(name)}
          className={`w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${
            errorMessage
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
      )}
      {errorMessage && (
        <p className="text-[16px] text-[#ff0000]">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputBox
