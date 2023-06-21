import About from "@/components/About"
import Developer from "@/components/Developer"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Testomonials from "@/components/Testomonials"

export default function Home() {
  return (
    <main className="pb-4">
      <div className="landingContent bg-darkBlack">
        <Navbar/>
        <Hero/>
      </div>
      <div>
        <About/>
        <Testomonials/>
        <Developer/>
      </div>
    </main>
  )
}
