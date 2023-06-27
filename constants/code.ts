export const jsCode = `
        <span className="text-red-500">const req = await axios.get("http://localhost:3000/getProjectContent/[API_KEY]/[PROJECT_TITLE]");</span>
        if(req.data.ok){
            const content = req.data.projectContent; // an object with created content
            /*
                {
                    title:"Amazing App",
                    description:"this is an amazing app",
                }
            */
        } 
`