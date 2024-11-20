import MainNavbar from "@/components/main/navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col ">
      <h1 className="flex flex-row p-2 sm:p-3 border-b-2">
        <div className="flex-1">
          <h1>LOGO</h1>
        </div>
        <div>
          <MainNavbar />
        </div>
      </h1>
      {children}
    </main>
  );
};

export default MainLayout;
