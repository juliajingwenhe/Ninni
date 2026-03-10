import { Home, Users, ShoppingBag, Package, ListTodo } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    { icon: Package, label: 'Bag', path: '/bag' },
    { icon: ListTodo, label: 'Tasks', path: '/tasks' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 z-20" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === `/home${item.path}` || (item.path === '' && location.pathname === '/home');
          
          return (
            <Link
              key={item.path}
              to={`/home${item.path}`}
              className={`flex-1 flex flex-col items-center py-3 transition-colors`}
              style={{ color: isActive ? 'var(--brand-coral)' : 'var(--muted-foreground)' }}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}