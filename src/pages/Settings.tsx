import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Bell, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleNotificationChange = (enabled: boolean) => {
    if (enabled) {
      toast({
        title: "Notifications Enabled",
        description: "You will now receive notifications",
      });
    } else {
      toast({
        title: "Notifications Disabled",
        description: "You will no longer receive notifications",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="glass">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <Label htmlFor="theme">Dark Mode</Label>
            </div>
            <Switch
              id="theme"
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <Switch
              id="notifications"
              onCheckedChange={handleNotificationChange}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;