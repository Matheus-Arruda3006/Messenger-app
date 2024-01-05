import HomeSidebar from "./HomeSidebar";
import MobileFooter from "./MobileFooter";

async function Sidebar ({children}: {
    children: React.ReactNode
}){
    return (
        <div className="h-screen">
            <HomeSidebar/>
            <MobileFooter/>
            <main className="lg:pl-20 h-screen">
                 {children}
            </main>
            
        </div>
    )
}

export default Sidebar;