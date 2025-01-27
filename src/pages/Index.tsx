import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ListTodo, Settings, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Event {
  id: string;
  title: string;
  date: Date;
}

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const { toast } = useToast();

  const handleAddEvent = () => {
    if (!date || !newEventTitle.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEventTitle,
      date: date,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    toast({
      title: "Success",
      description: "Event added successfully",
    });
  };

  const features = [
    {
      title: "Calendar Management",
      description: "Organize your schedule with our intuitive calendar interface",
      icon: CalendarIcon,
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

  return (
    <div className="container mx-auto animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Personal Organizer</h1>
        <p className="text-xl text-muted-foreground">
          Manage your schedule, tasks, and notes in one place
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="glass col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Calendar
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="Enter event title"
                      />
                    </div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                    <Button onClick={handleAddEvent}>Add Event</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Events for selected date:</h3>
              {events
                .filter(
                  (event) =>
                    event.date.toDateString() === date?.toDateString()
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-2 bg-secondary rounded-md mb-2 flex justify-between items-center"
                  >
                    <span>{event.title}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setEvents(events.filter((e) => e.id !== event.id));
                        toast({
                          title: "Success",
                          description: "Event deleted successfully",
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
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
    </div>
  );
};

export default Index;