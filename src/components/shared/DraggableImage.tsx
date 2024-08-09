import Image from "next/image";
import {useTheme} from "next-themes";


const DraggableImage = ({ name, alt} : { name: string, alt: string }) => {
    const {theme} = useTheme();

    return (
        <Image src={`/draggables/${theme}/${name}.svg`} alt={alt} width={200} height={119} className={"shadow-medium rounded-[10px]"}/>
    );
}

export default DraggableImage;