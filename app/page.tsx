import About from "@/components/About"
import Hero from "@/components/Hero"
import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="pb-4">
      <div className="landingContent bg-darkBlack">
        <Navbar/>
        <Hero/>
      </div>
      <div>
        <About/>
      </div>
    </main>
  )
}
