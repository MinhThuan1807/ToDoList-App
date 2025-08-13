import { Link } from 'react-router-dom'
// import { ReactComponent as PlanetSvg } from '../../assets/404/planet.svg'
// import { ReactComponent as AstronautSvg } from '../../assets/404/astronaut.svg'

function NotFound() {
  return (
    <div className="w-screen h-screen bg-[#25344C] text-white flex items-center justify-center">
      <div
        className="relative w-full h-full flex flex-col items-center justify-center bg-center bg-repeat bg-contain"
        style={{
          backgroundImage: 'url("src/assets/404/particles.png")',
          animation: 'stars 12s linear infinite alternate'
        }}
      >
        <style>
          {`
            @keyframes stars {
              0% { background-position: -100% 100%; }
              100% { background-position: 0 0; }
            }
            @keyframes spinAround {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}
        </style>
        <h1 className="text-[100px] font-extrabold">404</h1>
        <div className="text-[18px] leading-[25px] font-normal max-w-[350px] text-center">
          LOST IN&nbsp;
          <span className="relative font-bold">
            <span className="relative">
              <span className="relative z-10">&nbsp;SPACE&nbsp;</span>
              <span className="absolute left-0 top-1/2 w-full border-b-4 border-[#fdba26]"></span>
            </span>
          </span>
          &nbsp;
          <span className="text-[#fdba26] font-medium">NhatQuangDev</span>
          ?<br />
          Hmm, looks like that page doesn&apos;t exist.
        </div>
        <div className="w-[390px] h-[390px] relative">
          <div
            className="absolute top-5 right-6"
            style={{
              width: '50px',
              height: '50px',
              animation: 'spinAround 5s linear infinite'
            }}
          >
            {/* <AstronautSvg /> */}
          </div>
          {/* <PlanetSvg /> */}
        </div>
        <Link to="/" className="no-underline">
          <button
            type="button"
            className="flex items-center border border-white text-white px-4 py-2 rounded hover:text-[#fdba26] hover:border-[#fdba26] transition-colors"
          >
            Go Home
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
