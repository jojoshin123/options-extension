import "./ReroutePage.scss"
import '../App.scss';

function ReroutePage() {
  return(
    <div className="container">
      <h2 className="title ibm-plex-mono-medium">Error!</h2>
      <h4 className="text-content ibm-plex-mono-regular">Please navigate to the options chain for a ticker on Robinhood and select an options contract:</h4>
      <img className="image" src="/images/rh_image.jpg" alt="Robinhood screenshot" />
      <a className="rh-link ibm-plex-mono-regular" href="https://www.robinhood.com" target="_blank" rel="noopener noreferrer">
      Link to Robinhood
      </a>
    </div>
    );
  
}

export default ReroutePage;