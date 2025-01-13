'use client'

type InputBoxProps = {
  label: string
  name: string
  type: string
  value: string
  placeholder: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  errorMessage?: string
  required: boolean
  isTextArea?: boolean
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  onChange,
  errorMessage,
  required = false,
  isTextArea = false,
}) => {
  return (
    <div>
      <label className="mb-2 block text-gray-700">{label}</label>
      {!isTextArea ? (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  )
}

export default InputBox
