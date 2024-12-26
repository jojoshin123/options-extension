
interface OptionsPageProps {
    toggle: boolean;
  }

function OptionsPage({toggle}: OptionsPageProps) {

    if (toggle){
        return (
            <>
            <h1>Vite + React</h1>
            <div>
                <p>Filler</p>
            </div>
            </>
        );
    }else{
        return (<></>)
    }
  
}

export default OptionsPage;
