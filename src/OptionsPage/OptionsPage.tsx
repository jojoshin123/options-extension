import { useState } from 'react';
import Grid from '../Grid/Grid.tsx';
import { Option } from '../types/Option.tsx'
import './OptionsPage.scss';

interface OptionsPageProps {
    option: Option | null;
    currentPrice: number;
  }

function OptionsPage({option, currentPrice}: OptionsPageProps) {

    const [highPrice, setHighPrice] = useState<number>(currentPrice+5);
    const [lowPrice, setLowPrice] = useState<number>(currentPrice-5);
    const [errorToggle, setErrorToggle] = useState<boolean>(false);

    function handleSubmit(e : React.FormEvent<HTMLFormElement>){

        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        
        // Try parsing input
        const l = parseFloat(formData.get("lowPriceInput") as string)
        const h = parseFloat(formData.get("highPriceInput") as string)
        if (isNaN(l) || isNaN(h)){
            // Render something
            setErrorToggle(true)
        }else{
            setLowPrice(l)
            setHighPrice(h)
            setErrorToggle(false)
        }

    }

    if (!option){
        return <></>
    }
    const date : string = `${option.expiration.getMonth()}/${option.expiration.getDay()}/${option.expiration.getFullYear()}`
    const content : string = `${option.ticker} $${option.strike.toString()} ${option.contract} ${date} heatmap`
    
    // setHighPrice(currentPrice+5);
    // setLowPrice(currentPrice-5);
    return (
        <>
        <h2>{content}</h2>
        <Grid
            option={option} 
            currentPrice={currentPrice} 
            lowPrice={lowPrice} 
            highPrice={highPrice} />
        <form onSubmit={handleSubmit}>
            <label>
                <span className='inputContainer'>
                    <h3 className='input-h3'>Price range:</h3>
                    <input 
                        className='input-box' 
                        name="lowPriceInput" 
                        defaultValue={lowPrice}
                        size={lowPrice.toString().length}
                        type='text'/>
                    <h4 className='hyphen'>—</h4>
                    <input 
                        className='input-box' 
                        name="highPriceInput" 
                        defaultValue={highPrice}
                        size={highPrice.toString().length}
                        type='text'/>
                    <button type="submit">Set price range</button>
                </span>
            </label>
        </form>
        <div>{errorToggle ? <p>This is an error</p> : <></>}</div>
        </>
        
    );
  
}

export default OptionsPage;
