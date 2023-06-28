export default async function copyToClipboard(text: string){
    try{
        const clipboardText = await navigator.clipboard.readText();
        await navigator.clipboard.writeText(`${text}`);
    }catch(err){
        console.log(err);
    }   
}