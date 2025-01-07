import { Option } from '../types/Option.tsx'

interface OptionsPageProps {
    option: Option | null;
  }

function OptionsPage({option}: OptionsPageProps) {

    
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
  
}

export default OptionsPage;
