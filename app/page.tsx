import About from "@/components/About"
import Developer from "@/components/Developer"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Testomonials from "@/components/Testomonials"

export default function Home() {
  return (
    <main className="">
      <div className="landingContent bg-darkBlack">
        <Hero/>
      </div>
      <div>
        <About/>
        <Testomonials/>
        <Developer/>
      </div>
      <div>
        <Footer links={[{text:"Home",url:"/"},{text:"Projects",url:"/projects"},{text:"Pricing",url:"/pricing"},{text:"Documentation",url:"/docs"}]}/>
      </div>
    </main>
  )
}
