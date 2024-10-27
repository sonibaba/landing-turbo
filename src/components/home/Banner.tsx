import Image from 'next/image'

const Banner = () => {
  return (
    <div className="relative w-full mb-4 bg-primary">
      <Image
        src="https://res.cloudinary.com/huastecanetwork/image/upload/turbo_pizza/banner_web.png"
        alt="Banner de Turbo Pizza"
        className="w-11/12 object-cover"
        width={1604}
        height={358}
      />
      {/* <Image
        src="https://res.cloudinary.com/huastecanetwork/image/upload/v1729808498/turbo_pizza/banner-movil.png"
        alt="Banner de Turbo Pizza"
        className="w-11/12 object-cover"
        width={1206}
        height={446}
      /> */}
    </div>
  )
}

export default Banner
