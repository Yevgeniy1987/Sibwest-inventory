import classNames from 'classnames';
import { Link, useRoute } from 'wouter';

export const NavLink = ({ children, className, ...props }) => {
  const [isActive] = useRoute(props.href);

  return (
    <Link
      {...props}
      className={classNames(
        'px-8 py-4 mt-3 border border-solid border-black rounded text-black hover:bg-gray-300',
        className,
        isActive && 'bg-amber-200'
      )}>
      {children}
    </Link>
  );
};
