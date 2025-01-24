type SkeletonProps = {
  height: string | number
  width?: string | number
  borderRadius?: string | number
  color?: string
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width = '100%',
  borderRadius = '4px',
  color = '#d1d5db',
  className,
}) => {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius:
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
        backgroundColor: color,
      }}
    />
  )
}

export default Skeleton
