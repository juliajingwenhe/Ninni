import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import FriendDetail from "./pages/FriendDetail";
import Shop from "./pages/Shop";
import Bag from "./pages/Bag";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import NewJournalEntry from "./pages/NewJournalEntry";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/home",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "friends", Component: Friends },
      { path: "shop", Component: Shop },
      { path: "bag", Component: Bag },
      { path: "tasks", Component: Tasks },
      { path: "profile", Component: Profile },
      { path: "journal", Component: Journal },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/friends/:id",
    Component: FriendDetail,
  },
  {
    path: "/journal/new",
    Component: NewJournalEntry,
  },
]);