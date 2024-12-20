import {BugsnagErrorBoundary} from "../../../bugsnag-browser";


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <BugsnagErrorBoundary FallbackComponent={({error}) => (
            <div>
                <h1>Произошла ошибка</h1>
                <p>{error.toString()}</p>
            </div>
        )}>
            {children}
        </BugsnagErrorBoundary>
    );
}