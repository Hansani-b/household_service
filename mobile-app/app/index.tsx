import { Redirect } from "expo-router";

// App root: send users to Home by default.
// Your Home screen route is /home (see app/home.tsx).
export default function Index() {
  return <Redirect href="/home" />;
}

