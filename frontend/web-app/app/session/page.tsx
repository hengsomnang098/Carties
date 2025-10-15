import { auth } from '@/auth'
import Heading from '../components/Heading';
import AuthTest from './AuthTest';

export default async function Session() {
    const session = await auth();
    return (
        <>
            <Heading title='Session dashboard' />
            <div className='bg-blue-200 border-2 border-blue-500'>
                <h3 className='text-lg'> Session Data</h3>
                <pre className=' whitespace-pre-wrap break-all'>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className='mr-4 mt-2'>
                <AuthTest />
            </div>
        </>
    )
}
