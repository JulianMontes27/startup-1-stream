import MainNavbar from "@/components/main/navbar";
import SearchForService from "@/components/search/search-for-service";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="flex flex-col h-full">
      <h1 className="flex flex-row p-2 sm:p-3 border-b-2">
        <div className="flex-1">
          <h1>LOGO</h1>
        </div>
        <div>
          <MainNavbar />
        </div>
      </h1>
      <div className="sm:p-2 p-3">
        <SearchForService />
      </div>
      {children}
    </main>
  );
};

export default MainLayout;
