"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { ModalProps } from '@/types';
import Input from './Input';
import { useState } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import axios from 'axios';

const Modal = ({ modalTitle,modalDescription,apiKey,isOpen, setIsOpen }: ModalProps) => {
  let completeButtonRef = useRef(null);
  const [inputProjectName,setInputProjectName] = useState<string>("");
  const [inputProjectPassword,setInputProjectPassword] = useState<string>("");
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [validInputs,setValidInputs] = useState<boolean>(false);
  const [formMessage,setFormMessage] = useState<string>("");

  function clearForm(){
    setInputProjectName("");
    setInputProjectPassword("");
    setShowPassword(false);
    setValidInputs(false);
    setFormMessage("");
  }

  async function handleCreateProject(){
    const formData = {
      name:inputProjectName,
      password:inputProjectPassword,
    }
    const {validateForm} = useFormValidation();

    const validatedInputs = validateForm(formData);
    console.log(validatedInputs);
    
    if(validatedInputs.valid){
      setValidInputs(true);
      setFormMessage("Creating your project...");
      try{
        const userToken = JSON.parse(localStorage.getItem('token') || "");
        if(userToken.trim()==="" || !userToken)
          throw new Error("Something went wrong while trying to access you account. Please try again later.");

        const req = await axios.post(`/api/createProject`,{token:userToken,apiKey});
        console.log(req);
        if(req.data.ok)
          window.location.reload();
      }catch(err){
        console.log(err);
      }
    }else{
      setValidInputs(false);
      setFormMessage(validatedInputs.errors?.name || validatedInputs.errors?.password || "Something went wrong while trying to create your project. Please try again later.")
    }
    setTimeout(()=>{
      clearForm();
    },1800);  
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={completeButtonRef}
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-[#1a1a1b] rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-200 text-[1.3em]">
                {modalTitle}
              </Dialog.Title>
              <Dialog.Description className="mt-2 mb-1 text-sm text-gray-500">
                {modalDescription}
              </Dialog.Description>

              <div className="flex flex-col gap-2">
                <div className={`${validInputs && "bg-gray-700 rounded-sm"}`}>
                  <Input type='text' inputValue={inputProjectName || ""} isDisabled={validInputs} inputPlaceholder='project name' setInputValue={setInputProjectName || undefined}/>
                </div>
                <div className={`flex gap-1 items-center w-full ${validInputs && "bg-gray-700 rounded-sm"}`}>
                  <div className="flex-1">
                    <Input type={`${!showPassword ? "password":"text"}`} isDisabled={validInputs} inputValue={inputProjectPassword || ""} inputPlaceholder='project password' setInputValue={setInputProjectPassword || undefined}/>
                  </div>
                  {
                    !showPassword ? (
                      <i onClick={()=>setShowPassword(true)
                      } className={`bi bi-eye-slash text-gray-400 cursor-pointer ${validInputs && "pointer-events-none"}`}></i>
                    ): (
                      <i className={`bi bi-eye text-gray-400 cursor-pointer ${validInputs && "pointer-events-none"}`} onClick={()=>setShowPassword(false)}></i>
                    )
                  }
                </div>
              </div>

              <div className="mt-4 flex items-center flex-col xs:flex-row gap-3">
                <button
                  type="button"
                  className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-lightBlue border border-transparent rounded-md hover:bg-darkBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 ${validInputs && "bg-gray-700 pointer-events-none"}`}
                  onClick={() => handleCreateProject()}
                  ref={completeButtonRef}
                  disabled={validInputs}
                >
                  Create My Project
                </button>
                <p className='font-thin text-lightBlue'>{formMessage}</p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
