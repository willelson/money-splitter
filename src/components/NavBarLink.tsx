import { useLocation, useNavigate } from "react-router";

type NavBarLink = {
  children: (props: { className: string }) => React.ReactNode;
  title: string;
  href: string;
};

const NavBarLink = ({ children, title, href }: NavBarLink) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const highlighted = pathname === href;
  const colorClass = `${highlighted ? "text-orange-300" : "text-secondary-muted"} text-sm font-light`;

  return (
    <div
      onClick={() => navigate(href)}
      className="flex flex-col items-center gap-1 hover:cursor-pointer"
    >
      {children({
        className: colorClass,
      })}
      <p className={colorClass}>{title}</p>
    </div>
  );
};

export default NavBarLink;
