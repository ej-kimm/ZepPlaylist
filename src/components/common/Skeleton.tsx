type SkeletonProps = {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  className?: string
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = '4px',
  className,
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius:
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }}
    />
  )
}

export default Skeleton
