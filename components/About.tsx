import Circle from "./ui/Circle"
import TextBox from "./ui/TextBox"

const About = () => {
  return (
    <div className="mt-3">
        <div className="container mx-auto">
            <h2 className="font-light text-center text-[1.6em]">What is Manageless?</h2>
            <div className="flex flex-col gap-5 mt-4 md:flex-row ">                
                <TextBox title="Introduction" text="It was designed and created for managing your application content in the most efficient and easiest way. From now, your content can be dynamically updated within clicks so that your application is always running and up to date.All this within a super lightweight and intuitive UI & UX."/>
                <TextBox title="Getting Started" links={[{text:"Sign In",url:"/signIn"},{text:"Docs",url:"/docs"}]} text="Making the process quicker is one of the strongest point of Manageless. It's never been easier, with just a few clicks, set up an account, if you do not already have one and boost your productivity."/>
            </div>
        </div> 
    </div>
  )
}

export default About
