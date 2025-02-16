import { useLocation, useNavigate } from "react-router";

type NavBarLink = {
  children: (props: { className: string }) => React.ReactNode;
  title: string;
  href: string;
  selector: string;
};

const NavBarLink = ({ children, title, href, selector }: NavBarLink) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const highlighted = pathname.includes(selector);
  const colorClass = `${highlighted ? "text-accent-foreground" : "text-secondary-muted"} text-sm font-light`;

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
