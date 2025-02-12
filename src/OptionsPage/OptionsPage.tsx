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
    
    return (
        <div className='container'>
            <h2>{content}</h2>
            <div className='text-block'>
                <p>This heatmap shows the contract's profitability at the given date.</p>
                <p>
                    On expiration day, the price simply reflects the intrinsic value, or <b>the difference between the 
                    contract's strike and the current price. </b>
                    Losses are capped at max loss (the current cost of the contract)
                </p>
            </div>
            <Grid
                option={option} 
                currentPrice={currentPrice} 
                lowPrice={lowPrice} 
                highPrice={highPrice} />
            <br/>
            <div className='text-block'>
                <p>The grid is capped at 20 cells -- 
                    the price range will spread evenly across the cells.</p>
                <p>Lower price range must be <b>below</b> the current price, 
                and the upper price range must be <b>above</b> the current price.</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <span className='inputContainer'>
                        <h3 className='input-h3'>Price range:</h3>
                        <input 
                            className='input-box' 
                            name="lowPriceInput" 
                            defaultValue={lowPrice}
                            size={lowPrice.toString().length}
                            type='text'
                            style={{'marginLeft': '1rem'}}/>
                        <h4 className='hyphen'>—</h4>
                        <input 
                            className='input-box' 
                            name="highPriceInput" 
                            defaultValue={highPrice}
                            size={highPrice.toString().length}
                            type='text'
                            style={{'marginRight': '1rem'}}/>
                        <button type="submit" className='submit-buttom'>Update price range</button>
                    </span>
                </label>
            </form>
            <div className=''>{errorToggle ? <p>This is an error</p> : <></>}</div>
        </div>
        
    );
  
}

export default OptionsPage;
