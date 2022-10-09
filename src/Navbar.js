import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar(props) {
  let { count } = props;

  // CSS for fix navbar on scroll
  const nav = {
    position: 'fixed',
    top: '0',
    width: '100%',
    zIndex: '1',
  }
  
  return (
    <nav className="nav" style={nav}>
      <Link to="/" className="site-title">
        {count} items in Product-List
      </Link>
      <ul>
        {/* <CustomLink to="/product">Products</CustomLink> */}
        <CustomLink to="/upload">Upload Product</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
