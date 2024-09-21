import {
  Menu,
  CircleUser,
  Home,
  ShoppingCart,
  Package,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavLink from "./NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { ModeToggle } from "./elements/ModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/userSlice";
import customApi from "@/api/customApi";

export default function Header() {
  const user = useSelector((state) => state.userState.user?.user);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to) => location.pathname === to;

  const handleLogout = async () => {
    await customApi.get("/auth/logout");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <NavLink to="/" icon={Home} isActive={isActive("/")}>
            Dashboard
          </NavLink>
          <NavLink
            to="/orders"
            icon={ShoppingCart}
            isActive={isActive("/orders")}
          >
            Orders
          </NavLink>
          <NavLink
            to="/services"
            icon={Package}
            isActive={isActive("/services")}
          >
            Services
          </NavLink>
          <NavLink
            to="/customers"
            icon={Users}
            isActive={isActive("/customers")}
          >
            Customers
          </NavLink>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form> */}
      </div>
      <div>
        <ModeToggle />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <span className="text-sm font-medium capitalize">{user.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
