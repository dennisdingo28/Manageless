"use client";
import { Tab } from "@headlessui/react";
import { Fragment, ReactNode, useState } from "react";
import CodeModal from "./pages/Projects/CodeModal";

const Tabs = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [code,setCode] = useState<ReactNode>();

  return (
    <Tab.Group>
        <CodeModal isOpen={isOpen} setIsOpen={setIsOpen} code={code}/>
        <Tab.List>
            <div className="flex flex-col xs:flex-row items-center xs:justify-center gap-1">
                <Tab as={Fragment}>
                    <button onClick={(()=>{
                            setIsOpen(true);
                            setCode(
                                <div className="max-w-[100%] w-[100%] overflow-x-scroll">
                                <p className='text-lightBlue whitespace-nowrap'>const <span className='text-gray-300'>req</span> = <span className='text-purple-700'>await </span>
                                    <span className='text-gray-300'>axios</span>.get(<span className='text-yellow-600 font-light'>'http://localhost:3000/getProjectContent/[YOUR_API_KEY]/[PROJECT_TITLE]'</span>)
                                </p>
                                <p className='text-lightBlue whitespace-nowrap'>
                                    <span className='text-purple-700'>if</span><span className='text-gray-300'>(req.data.ok)</span>
                                    <span className='text-gray-300'>{`{`}</span>
                                    <br/>
                                    const <span className='text-gray-300'>
                                    content</span> = <span className='text-gray-300'>req.<span className='text-lightBlue'>data</span>.projectContent;</span>
                                    <br/>
                                    <div className='text-green-800'>
                                        /*<br/>
                                        {`{`}
                                        <div className="ml-3">
                                            
                                            "title":"Amazing App",<br/>
                                            "description":"this is an amazing app"
                                            <br/>
                                        </div>
                                            
                                        {`}`}<br/>
                                        */
                                        <br/>
                                    </div>
                                    <span className='text-gray-300'>{`}`}</span>
        
                                </p>
                            </div>
                            )
                    })} className={`bg-darkBlue max-w-[200px] text-gray-200 hover:bg-blue-700 font-medium text-[.9em] w-full outline-none rounded-sm p-1`}>Javascript</button>
                </Tab>
                <Tab as={Fragment}>
                    <button onClick={(()=>{
                            setIsOpen(true);
                            setCode(
                                <div className='max-w-[100%] w-[100%] overflow-x-scroll'>
                                <p className='text-lightBlue whitespace-nowrap'>
                                    <span className='text-purple-700'>import</span> <span className='text-gray-300'>requests</span>
                                    <br />
            
                                    url = <span className='text-yellow-600 font-light'>'http://localhost:3000/getProjectContent/[YOUR_API_KEY]/[PROJECT_TITLE]'</span>
                                    <br />
                                    response = <span className='text-gray-300'>requests</span>.get<span className='text-gray-300'>(url)</span><br />
            
                                    <span className='text-purple-700'>if</span> <span className='text-gray-300'>response.ok :</span><br />
                                    <div className="ml-3">
                                        content = <span className='text-gray-300'>response.</span><span className='text-yellow-600'>json</span><span className='text-gray-300'>()</span>[<span className='text-gray-300'>'projectContent'</span>]
                                        <br/>print<span className='text-gray-300'>(content)</span>
                                    </div>
                                        
                                </p>
                             
                            </div>
                            )
                        })} className={`bg-darkBlue max-w-[200px] text-gray-200 hover:bg-blue-700 font-medium text-[.9em] w-full outline-none rounded-sm p-1`}>Python</button>
                </Tab>
            </div>
        </Tab.List>
    </Tab.Group>
  )
}

export default Tabs