import GoogleTrends from './GoogleTrends.js'

const Trends = ({name}) => {
    console.log(name)
    return (
      <>
        <h2>{name} Trends</h2>
        <div id="widget">
          <GoogleTrends
            type="TIMESERIES"
            keyword={name}
            url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
          />
          {console.log(name)}
        </div>
      </>
    );
  }

  export default Trends()