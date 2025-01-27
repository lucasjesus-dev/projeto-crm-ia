import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ListTodo, Settings } from "lucide-react";

const features = [
  {
    title: "Calendar Management",
    description: "Organize your schedule with our intuitive calendar interface",
    icon: Calendar,
  },
  {
    title: "Task Organization",
    description: "Keep track of your tasks and projects efficiently",
    icon: ListTodo,
  },
  {
    title: "Customizable Settings",
    description: "Personalize your experience with advanced settings",
    icon: Settings,
  },
];

const Index = () => {
  return (
    <div className="container mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Personal Organizer</h1>
        <p className="text-xl text-muted-foreground">
          Manage your schedule, tasks, and notes in one place
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {features.map((feature) => (
          <Card key={feature.title} className="glass">
            <CardHeader>
              <feature.icon className="h-8 w-8 mb-4 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;