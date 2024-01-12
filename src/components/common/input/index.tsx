import{InputHTMLAttributes} from 'react'
import{formatReal} from 'app/util/money'
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    onChange?: (value?:any)=> void;
    id:string;
    label:string;
    columnsClasse?:string;
    currency?:boolean;
}

export const Input : React.FC<InputProps> = ({
    onChange,
    label,
    columnsClasse,
    id,
    currency,
    ...inputprops

}:InputProps)=>{
    const onInputChange = (event) => {
        let value = event.target.value;
    
        if(value && currency){
            value = formatReal(value);
        }
    
        if(onChange){
            onChange(value)
        }
    }
    return(
        <div className={`field column ${columnsClasse}`} >
        <label className="label" htmlFor={id}>{label}</label>
        
        <div className="control">
        <input className="input" 
                    id={id} {...inputprops}
                    onChange={onInputChange}/>
            

        </div>
    </div>

    )
}