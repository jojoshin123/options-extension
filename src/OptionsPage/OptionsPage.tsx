import Grid from '../Grid/Grid.tsx';
import { Option } from '../types/Option.tsx'
import './OptionsPage.scss';

interface OptionsPageProps {
    option: Option | null;
  }

function OptionsPage({option}: OptionsPageProps) {

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
        </div>
        <Grid expiration={option.expiration} ></Grid>
        </>
    );
  
}

export default OptionsPage;
