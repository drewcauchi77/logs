import { NextPage } from 'next';
import LogsList from '@/app/components/client/LogsList';

type Log = string;

interface FetchResponse {
    ok: boolean;
    status: number;
    json: () => Promise<Log[]>;
}

const Home: NextPage = async () => {
    const res: FetchResponse = await fetch('https://challenges.betterstudio.io/logs', {
        method: 'GET',
        headers: {
            'x-log-key': process.env.API_KEY!,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch logs: ${res.status}`);
    }

    const logs: Log[] = await res.json();

    return (
        <main className="p-8 min-h-screen">
            <LogsList logs={logs} />
        </main>
    );
}
 
export default Home;