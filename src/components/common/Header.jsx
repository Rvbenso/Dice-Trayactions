import dragonPomo from '../../assets/dragonPomo.jpg'

export default function Header() {
    return (
        <head className=" text-lg md:text-xl lg:text-2xl z-2 absolute rounded-full w-[98%] h-[200px] m-[20px] bg-linear-to-r from-[#00ccff] to-[#ff00dd] bg-opacity-50 items-center justify-center flex">
            <img src={dragonPomo} alt="dragon" className="absolute left-[1%] w-[160px] h-[160px] rounded-full border-1 shadow-red-900 shadow-md border-red-900" />
            <h1 className="ml-[160px] mr-[160px]  text-[#2a8d77] font-serif font-extrabold">Wellcome to Dice-Trayactions</h1>
            <img src={dragonPomo} alt="dragon" className="absolute right-[1%] w-[160px] h-[160px] rounded-full border-1 shadow-red-900 shadow-md border-red-900" />
        </head>
    )
}