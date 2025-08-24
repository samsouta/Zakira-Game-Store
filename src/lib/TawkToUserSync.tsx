import { useEffect } from "react";

interface User {
  username: string;
  email: string | null;
  phone_number?: string;
}

interface Props {
  user: User | null;
}

export default function TawkToUserSync({ user }: Props) {
  useEffect(() => {
    const Tawk_API = (window as any).Tawk_API;

    if (Tawk_API && user) {
      const attributes = {
        name: user.username || "Guest",
        email: user.email
          ? user.email
          : `${user.phone_number || "guest"}@noemail.local`,
      };

      // Always wait for widget ready
      Tawk_API.onLoad = function () {
        console.log("Tawk loaded, setting user:", attributes);

        Tawk_API.setAttributes(attributes, (err: any) => {
          if (err) console.error("Tawk API error:", err);
          else console.log("Tawk user set ✅");
        });
      };
    }
  }, [user]);

  return null;
}
