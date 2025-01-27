import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Plus, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
}

const Index = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState("09:00");
  const { toast } = useToast();

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return times;
  };

  const handleAddEvent = () => {
    if (!date || !newEventTitle.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: newEventTitle,
      date: date,
      time: selectedTime,
    };

    setEvents([...events, newEvent]);
    setNewEventTitle("");
    toast({
      title: "Sucesso",
      description: "Evento adicionado com sucesso",
    });
  };

  return (
    <div className="h-screen p-4">
      <div className="grid grid-cols-1 h-full">
        <Card className="glass h-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Calendário
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Evento</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título do Evento</Label>
                      <Input
                        id="title"
                        value={newEventTitle}
                        onChange={(e) => setNewEventTitle(e.target.value)}
                        placeholder="Digite o título do evento"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Horário</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {selectedTime}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {generateTimeOptions().map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                      locale={ptBR}
                    />
                    <Button onClick={handleAddEvent}>Adicionar Evento</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4 h-[calc(100vh-12rem)]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border h-full"
              locale={ptBR}
            />
            <div className="space-y-4">
              <h3 className="font-semibold">Eventos para o dia selecionado:</h3>
              {events
                .filter(
                  (event) =>
                    event.date.toDateString() === date?.toDateString()
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-2 bg-secondary rounded-md flex justify-between items-center"
                  >
                    <span>
                      {event.title} - {event.time}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setEvents(events.filter((e) => e.id !== event.id));
                        toast({
                          title: "Sucesso",
                          description: "Evento excluído com sucesso",
                        });
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;