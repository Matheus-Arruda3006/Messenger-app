import getCurrentUser from "@/app/actions/getCurrentUser";
import HomeSidebar from "./HomeSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar ({children}: {
    children: React.ReactNode
}){

    const currentUser = await getCurrentUser();

    return (
        <div className="h-screen">
            <HomeSidebar currentUser={currentUser!}/>
            <MobileFooter/>
            <main className="lg:pl-20 h-screen">
                 {children}
            </main>
            
        </div>
    )
}

export default Sidebar;