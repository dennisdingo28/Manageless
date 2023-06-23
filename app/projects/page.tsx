import Auth from "@/components/hoc/Auth"

const page = async () => {
    
  return (
    <Auth>
        <div>
            projects page
        </div>
    </Auth>
    
  )
}

export default page