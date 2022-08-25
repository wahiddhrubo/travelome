import Image from 'next/image'

export default function Gallery({images, name}){
	const imgNo =images.length
	let src =''
	if(imgNo == 5){
		return(
			<div className= " w-[1180px] h-[400px] grid grid-cols-2 ">
			<div className="">
		      <Image
		        alt={1}
		        src={images[0]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-l-xl"
		      />
			</div>
			<div className="flex flex-wrap">
			<div className="pl-2 w-1/2">
		      <Image
		        alt={2}
		        src={images[1]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2"
		      />
			</div>
			<div className="pl-2 w-1/2">
		      <Image
		        alt={name}
		        src={images[2]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2 rounded-tr-xl"
		      />
			</div>
			<div className="pl-2 w-1/2">
		      <Image
		        alt={3}
		        src={images[3]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2"
		      />
			</div>
			<div className="pl-2 w-1/2">
		      <Image
		        alt={4}
		        src={images[4]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2 rounded-br-xl"
		      />
			</div>
			</div>
			</div>
			)
	}else if(imgNo == 4){
		return(
			<div className= " w-[1180px] h-[400px] grid grid-cols-2 ">
			<div className="">
		      <Image
		        alt={1}
		        src={images[0]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-l-xl"
		      />
			</div>
			<div className="flex flex-wrap">
			<div className="pl-2 w-1/2">
		      <Image
		        alt={2}
		        src={images[1]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2"
		      />
			</div>
			<div className="pl-2 w-1/2">
		      <Image
		        alt={name}
		        src={images[2]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2 rounded-tr-xl"
		      />
			</div>
			<div className="pl-2">
		      <Image
		        alt={4}
		        src={images[3]}
		        width={600}
		        height={200}
		        objectFit="cover"
		        quality={100}
		        className="pl-2 rounded-br-xl"
		      />
			</div>
			</div>
			</div>
			)
	}else if(imgNo == 3){
		return(
			<div className= " w-[1180px] grid grid-cols-2 ">
			<div className="">
		      <Image
		        alt={1}
		        src={images[0]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-l-xl"
		      />
			</div>
			<div className="grid grid-cols-2">
			<div className="pl-2 ">
		      <Image
		        alt={2}
		        src={images[1]}
		        width={300}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2"
		      />
			</div>
			<div className="pl-2 ">
		      <Image
		        alt={name}
		        src={images[2]}
		        width={300}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="pl-2 rounded-tr-xl"
		      />
			</div>
			</div>
			</div>
			)
	}else if(imgNo == 2){
		return(
			<div className= " w-[1180px] gap-2 grid grid-cols-2 ">
			<div className="">
		      <Image
		        alt={1}
		        src={images[0]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-l-xl"
		      />
			</div>
			<div className="">
		      <Image
		        alt={1}
		        src={images[1]}
		        width={600}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-r-xl"
		      />
			</div>
			</div>
			)
	}else{
		return(
			<div className= " w-[1180px]">
			<div className="">
		      <Image
		        alt={1}
		        src={images[0]}
		        width={1180}
		        height={400}
		        objectFit="cover"
		        quality={100}
		        className="rounded-xl"
		      />
			</div>
			</div>
			)
	}
}