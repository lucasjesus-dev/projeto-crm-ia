import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ListTodo, FileText, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Calendar",
      description: "Manage your schedule and appointments",
      icon: Calendar,
      route: "/",
    },
    {
      title: "Tasks",
      description: "Track and organize your tasks",
      icon: ListTodo,
      route: "/tasks",
    },
    {
      title: "Notes",
      description: "Create and manage your notes",
      icon: FileText,
      route: "/notes",
    },
    {
      title: "Settings",
      description: "Customize your experience",
      icon: Settings,
      route: "/settings",
    },
  ];

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Personal Organizer</h1>
        <p className="text-xl text-muted-foreground">
          Manage your schedule, tasks, and notes in one place
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="glass hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-6 w-6 text-primary" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{feature.description}</p>
              <Button onClick={() => navigate(feature.route)} className="w-full">
                Open {feature.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;