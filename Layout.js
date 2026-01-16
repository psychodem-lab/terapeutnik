import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Users, Plus, LayoutDashboard, Heart, LogOut, Calendar, Wrench, DollarSign } from "lucide-react";
import { User } from "@/entities/User";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger } from
"@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
{
  title: "Panel główny",
  url: createPageUrl("Dashboard"),
  icon: LayoutDashboard
},
{
  title: "Kalendarz",
  url: createPageUrl("Kalendarz"),
  icon: Calendar
},
{
  title: "Lista pacjentów",
  url: createPageUrl("Pacjenci"),
  icon: Users
},
{
  title: "Narzędzia",
  url: createPageUrl("Narzedzia"),
  icon: Wrench
},
{
  title: "Rozliczenia",
  url: createPageUrl("Rozliczenia"),
  icon: DollarSign
},
{
  title: "Dodaj pacjenta",
  url: createPageUrl("DodajPacjenta"),
  icon: Plus
}];


export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await User.me();
        setUser(userData);
      } catch (error) {
        console.error("Błąd podczas ładowania danych użytkownika:", error);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await User.logout();
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary-blue: #2563eb;
          --primary-blue-hover: #1d4ed8;
          --secondary-blue: #dbeafe;
          --text-primary: #1f2937;
          --text-secondary: #6b7280;
          --background-primary: #f8fafc;
          --background-card: #ffffff;
          --border-subtle: #e2e8f0;
        }
      `}</style>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: 'var(--background-primary)' }}>
        <Sidebar className="border-r" style={{ borderColor: 'var(--border-subtle)' }}>
          <SidebarHeader className="border-b p-6" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-3">
              <div className="bg-green-700 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-blue-hover))' }}>
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Terapeutnik</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>System dla psychoterapeutów</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2"
              style={{ color: 'var(--text-secondary)' }}>
                Nawigacja
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) =>
                  <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                      asChild
                      className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mb-1 ${
                      location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700'}`
                      }>

                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user && user.full_name ? user.full_name.charAt(0).toUpperCase() : 'T'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                    {user && user.full_name ? user.full_name : 'Terapeuta'}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                    {user && user.email ? user.email : 'Ładowanie...'}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="w-full justify-start gap-2 text-gray-600 border-gray-200 hover:bg-gray-50">

                <LogOut className="w-4 h-4" />
                Wyloguj się
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b px-6 py-4 md:hidden" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>TherapyNotes</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>);

}
