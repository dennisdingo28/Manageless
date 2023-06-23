import Auth from "@/components/hoc/Auth"
import InfoCard from "@/components/pages/Projects/InfoCard"

const page = async () => {
    
  return (
    <Auth>
        <div className="bg-[#161617] min-h-[100vh] text-white">
            <div className="container mx-auto">
              
              <div className="dashboardHeader flex flex-col sm:flex-row pt-6 gap-4">
                <InfoCard cardTitle="API Key" cardBody={<p>test body</p>} cardFooter={<p>test footer</p>}/>
                <InfoCard cardTitle="API Key" cardBody={<p>test body</p>} cardFooter={<p>test footer</p>}/>
                <InfoCard cardTitle="API Key" cardBody={<p>test body</p>} cardFooter={<p>test footer</p>}/>

              </div>

              </div>
        </div>
    </Auth>
    
  )
}

export default page