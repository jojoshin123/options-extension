import Grid from '../Grid/Grid.tsx';
import { Option } from '../types/Option.tsx'
import './OptionsPage.scss';

interface OptionsPageProps {
    option: Option | null;
    currentPrice: number;
  }

function OptionsPage({option, currentPrice}: OptionsPageProps) {

    if (!option){
        return <></>
    }
    
    return (
        <>
        <div>
            <p>{option.ticker}</p>
            <p>{option.contract}</p>
            <p>{option.expiration.toDateString()}</p>
            <p>{option.strike.toString()}</p>
            <p>{option.currentPremium}</p>
        </div>
        <Grid option={option} currentPrice={currentPrice} ></Grid>
        </>
    );
  
}

export default OptionsPage;
