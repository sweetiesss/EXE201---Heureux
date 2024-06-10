import defaultImg from "../../assets/img/DefaultAvatar.png";


export default function InforBoxCol({imgSrc,name,title}){

    return(
        <div className="flex items-center">
            <img src={imgSrc?imgSrc:defaultImg} style={{width:"4rem"}}/>
            <div className="ml-[1rem]">
                <p className="font-semibold text-base">{name&&name}</p>
                <p className="font-light text-sm">{title&&title}</p>
            </div>
        </div>
    )
}