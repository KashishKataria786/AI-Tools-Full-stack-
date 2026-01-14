
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <div className='max-w-screen'>
        <Header />

      {/* Flex wrapper under the header */}
      <div className="md:flex h-[calc(100vh-64px)]">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
      </div>
    </>
  );
};

export default Layout;
