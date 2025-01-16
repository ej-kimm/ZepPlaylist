import type { UseFormRegister } from 'react-hook-form'

// extends 타입확장 리액트훅폼에서 주는 타입스크립트 단일타입말고 상위에있는거 한번 보고
type InputBoxProps = {
  name: string
  type: string
  placeholder: string
  register: UseFormRegister<any>
  errorMessage?: string
  required: boolean
  isTextArea?: boolean
  className?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

const InputBox: React.FC<InputBoxProps> = ({
  name,
  type = 'text',
  placeholder,
  register,
  errorMessage,
  required = false,
  isTextArea = false,
  className = '',
}) => {
  const inputClass = `w-full rounded-lg border p-3 focus:outline-none focus:ring-2 ${
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
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default InputBox
