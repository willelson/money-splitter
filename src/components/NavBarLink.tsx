import { useLocation, useNavigate } from "react-router";

type NavBarLink = {
  children: React.ReactElement;
  title: string;
  href: string;
};

const NavBarLink = ({ children, title, href }: NavBarLink) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log(pathname);

  const onClick = () => {
    navigate(href);
  };

  const highlighted = pathname === href;

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-1 hover:cursor-pointer"
    >
      {children}
      <p
        className={`${highlighted ? "text-orange-300" : "text-secondary-muted"} text-sm font-light`}
      >
        {title}
      </p>
    </div>
  );
};

export default NavBarLink;
