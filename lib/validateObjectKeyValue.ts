import { useFormValidation } from "@/hooks/useFormValidation";
import { FormDataProps } from "@/types";

export default function validateObjectKeyValue(formData:FormDataProps){
    const {validateForm} = useFormValidation();
    const validatedInputs = validateForm(formData);

    return validatedInputs;
}