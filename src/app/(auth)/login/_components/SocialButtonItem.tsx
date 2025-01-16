type SocialButtonItemProps = {
  hoverColor: string
  onClick: () => void
  icon?: React.ReactNode
  type?: 'button' | 'submit'
}
const SocialButtonItem = ({
  hoverColor,
  onClick,
  icon,
}: SocialButtonItemProps) => {
  return (
    <button
      className={`flex items-center space-x-2 rounded px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 ${hoverColor}`}
      type="button"
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
    </button>
  )
}

export default SocialButtonItem
