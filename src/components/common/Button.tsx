// ex) 재사용할 공용 버튼 컴포넌트 폴더

type ButtonProps = {
  type: 'submit' | 'button' | 'reset'
  label: string
}

export default function Button({ type, label }: ButtonProps) {
  return <button type={type}>{label}</button>
}
