import Head from "next/head";
import Navbar from "../Header/page";
import Footer from "../Footer/page";

const Layout = ({
  children,
  title = "Local Events",
  description = "Find and discover local events",
  keywords = "events, local events, concerts, festivals",
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="w-full">
          <Navbar />
        </div>
        <main className="flex-grow bg-gray-100">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
