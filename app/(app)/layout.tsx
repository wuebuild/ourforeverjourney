import Nav from "@/shared/components/Nav";

export default function PublicLayout ({
    children
} : { children : React.ReactNode}) {
    return (
        <div className="min-h-screen bg-neutral-50">
            <Nav/>
            <div className="pt-16"/>
            {children}
        </div>
    )
}