

export default function TaskAssigned({className}){

    return(
        <div className={`${className&&className} flex flex-col justify-center items-center rounded-lg  bg-[var(--task-assigned-background-color)] text-[var(--task-assigned-text-color)]`}>
            <div className="w-[40%] h-[40%] flex justify-center items-center bg-white rounded-md shadow-xl text-3xl ">04</div>
            <div className="mt-[1rem] font-bold text-xl">Tasks</div>
            <div className="text-sm">You are assigned</div>
        </div>
    )
}