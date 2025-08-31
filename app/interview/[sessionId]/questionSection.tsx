import {Card,CardContent} from '@/components/ui/card'
// import { Button } from '../ui/button'


export default function QuestionSection({text,index}:{
    text:string,
    index:number
}){


    return (
        <div className="w-full h-full border text-[1.5em] overflow-auto flex flex-col">
            {/* <Timer duration={2}/> */}
            <Card className='m-4 p-4 shadow-lg border'>
                <CardContent>
                    <h2 className=" font-semibold">{"Q"+(index+1)+" )  "}{text} </h2>
                </CardContent>
            </Card>
        </div>
    )
}