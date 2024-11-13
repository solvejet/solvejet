import PropTypes from "prop-types";
import TopBar from "./Topbar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <TopBar />
      <Navbar />
      <main className="container mx-auto px-4 pt-32">{children}</main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
