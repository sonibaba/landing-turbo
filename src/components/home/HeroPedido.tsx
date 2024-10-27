import Image from 'next/image'

const HeroPedido = () => {
  return (
    <div className="bg-primary p-4 flex items-center justify-between">
      <div className="w-6/12 py-6 lg:py-14">
        <Image
          src="https://res.cloudinary.com/huastecanetwork/image/upload/v1729911812/turbo_pizza/letras/Letras_turbo_WEB.svg"
          alt="Turbo Pizza Logo"
          className="max-w-full h-auto"
          width={1274}
          height={121}
        />
        {/* <Image
          src="https://res.cloudinary.com/huastecanetwork/image/upload/turbo_pizza/letras/Letras_Turbo_Mobile.svg"
          alt="Turbo Pizza Logo"
          width={780}
          height={265}
        /> */}
      </div>
      <div className="flex items-center">
        <div className="inline-flex items-center bg-black rounded-lg overflow-hidden">
          <div className="p-2 bg-white">
            <svg
              className="w-6 h-6 text-primary-foreground  rounded "
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#000"
                d="M169.7 .9c-22.8-1.6-41.9 14-47.5 34.7L110.4 80c.5 0 1.1 0 1.6 0c176.7 0 320 143.3 320 320c0 .5 0 1.1 0 1.6l44.4-11.8c20.8-5.5 36.3-24.7 34.7-47.5C498.5 159.5 352.5 13.5 169.7 .9zM399.8 410.2c.1-3.4 .2-6.8 .2-10.2c0-159.1-128.9-288-288-288c-3.4 0-6.8 .1-10.2 .2L.5 491.9c-1.5 5.5 .1 11.4 4.1 15.4s9.9 5.6 15.4 4.1L399.8 410.2zM176 208a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm64 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM96 384a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
              ></path>
            </svg>
          </div>
          <button className="px-3 py-2 text-sm text-primary-foreground font-semibold rounded-r-lg">
            Ordenar
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroPedido
