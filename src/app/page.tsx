import LogsList from '@/app/components/client/LogsList';

type Log = string;

const Home = async () => {
    const res = await fetch('https://challenges.betterstudio.io/logs', {
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
            <LogsList logs={logs}></LogsList>
        </main>
    );
}
 
export default Home;