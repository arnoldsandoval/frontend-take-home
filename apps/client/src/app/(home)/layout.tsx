import { Navigation, NavigationLink } from "@/components/ui/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto grid gap-6 px-8 py-8">
      <Navigation>
        <NavigationLink label="Users" href="/users" />
        <NavigationLink label="Roles" href="/roles" />
      </Navigation>
      {children}
    </div>
  );
}
