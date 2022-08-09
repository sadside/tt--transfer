import { Link, useMatch } from "react-router-dom";

const CustomSidebarLink = ({ children, to, ...props }) => {
  const match = useMatch(to);

  return (
    <Link
      to={to}
      {...props}
      style={{
        color: match ? "red" : "blue",
        // backgroundColor: match ? "red" : "blue",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          color: match ? "red" : "blue",
          background: match ? "rgba(149, 159, 173, 0.2)" : "#364150",
          textDecoration: "none",
        }}
      >
        {children}
      </div>
    </Link>
  );
};

export default CustomSidebarLink;
