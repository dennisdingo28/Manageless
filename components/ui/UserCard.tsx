import Image from "next/image"

const UserCard = () => {
  return (
    <div>
        <div className="shadow-[0px_0px_2px_rgb(67,125,250)] rounded-md p-1">
            <div className="flex flex-col">
                <div className="cardHeader self-center flex items-center">
                    <Image src={"/profile.png"} width={70} height={70} alt="profile"/>
                    <p>username</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cumque, dolorem dolor tempora fugiat eos excepturi itaque corrupti nihil odio reiciendis ipsa earum magni facere molestiae magnam error eaque architecto atque porro nulla saepe. Accusamus?</p>
                    <div className="socialLinks flex items-center justify-center gap-3">
                        <i className="bi bi-github cursor-pointer text-[1.5em] text-[#010409]"></i>
                        <i className="bi bi-discord cursor-pointer text-[1.5em] text-[#5662f6]"></i>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default UserCard