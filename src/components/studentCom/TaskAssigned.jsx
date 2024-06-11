

export default function TaskAssigned({className,title,body,number}){

    return(
        <div className={`${className?className:" bg-[var(--task-assigned-background-color)] text-[var(--task-assigned-text-color)]"} rounded-xl shadow-xl flex flex-col justify-center items-center `}>
            <div className="w-[40%] h-[45%] flex justify-center items-center bg-white rounded-md shadow-xl text-3xl ">{number}</div>
            <div className="mt-[1rem] font-bold text-xl">{title}</div>
            <div className="text-sm">{body}</div>
        </div>
    )
}