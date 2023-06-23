import { InfoCardProps } from "@/types"

const InfoCard = ({cardTitle,cardBody,cardFooter}:InfoCardProps) => {
  return (
    <div className="bg-darkBlack p-3 rounded-md w-full">
        <div className="cardHeader">
            <h3 className="font-medium font-poppins text-center text-[1.2em]">{cardTitle}</h3>
        </div>
        <div className="cardBody">
            {cardBody && (cardBody)}
        </div>
        <div className="cardFooter flex items-center justify-center">
            {cardFooter && (cardFooter)}
        </div>
    </div>
  )
}

export default InfoCard