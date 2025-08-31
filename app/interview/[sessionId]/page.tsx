import { PrismaClient } from "@prisma/client";
import MainPage from './main'
import MainPageClientWrapper from "./MainPageClientWrapper";
const client = new PrismaClient();
export default async function InterviewPage({ params }: { params: Promise<{ sessionId: string }> }) {
    const { sessionId } = await params;
    const session = await client.session.findUnique({
        where: { id: sessionId },
    });
    console.log(session);
    
    if (!session) {
        return <div>Session not found</div>;
    }
    if(session.endedAt !== null){
        return <div>Session has ended</div>;
    }
    return (
        <div>
            <MainPageClientWrapper sessionId={sessionId}/>
        </div>
    );
}