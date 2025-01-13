type SocialButtonItemProps = {
  label: string
  bgColor: string
  hoverColor: string
  onClick: () => void
  icon?: React.ReactNode
  type?: 'button' | 'submit'
}
const SocialButtonItem = ({
  label,
  bgColor,
  hoverColor,
  onClick,
  icon,
}: SocialButtonItemProps) => {
  return (
    <button
      className={`flex items-center space-x-2 rounded px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 ${bgColor} ${hoverColor}`}
      type="button"
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  )
}

export default SocialButtonItem
