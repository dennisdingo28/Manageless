import { CricleProps } from "@/types"
const Circle = ({circleWidth,circleHeight,color,outline}:CricleProps) => {
    const circleStyle = {
        width: `${circleWidth}px`,
        height: `${circleHeight}px`,
        borderRadius: '50%',
        backgroundColor: outline ? "transparent":color,
        border:outline ? `2px solid ${color}`:""
      };
  return (
    <div style={circleStyle}>
      
    </div>
  )
}

export default Circle
