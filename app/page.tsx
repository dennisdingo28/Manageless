import About from "@/components/About"
import Developer from "@/components/Developer"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="">
      <div className="landingContent bg-darkBlack">
        <Hero/>
      </div>
      <div>
        <About/>
        <Developer/>
      </div>
      <div>
        <Footer links={[{text:"Home",url:"/"},{text:"Projects",url:"/projects"}]}/>
      </div>
    </main>
  )
}
