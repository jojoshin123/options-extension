import { Option } from '../types/Option.tsx'

interface OptionsPageProps {
    toggle: boolean;
    option: Option | null;
  }

function OptionsPage({toggle, option}: OptionsPageProps) {

    if (toggle){
        return (
            <>
            <div>
                <p>{option?.ticker}</p>
                <p>{option?.contract}</p>
                <p>{option?.expiration.toDateString()}</p>
                <p>{option?.strike.toString()}</p>
            </div>
            </>
        );
    }else{
        return (<></>)
    }
  
}

export default OptionsPage;
