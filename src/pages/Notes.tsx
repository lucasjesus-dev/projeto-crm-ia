import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Note {
  id: string;
  title: string;
  content: string;
  status: "todo" | "doing" | "done";
  createdAt: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { toast } = useToast();

  const handleAddNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: newNote.title,
      content: newNote.content,
      status: "todo",
      createdAt: new Date(),
    };

    setNotes([...notes, note]);
    setNewNote({ title: "", content: "" });
    toast({
      title: "Sucesso",
      description: "Nota adicionada com sucesso",
    });
  };

  const handleEditNote = () => {
    if (!editingNote) return;

    setNotes(
      notes.map((note) =>
        note.id === editingNote.id ? { ...editingNote } : note
      )
    );
    setEditingNote(null);
    toast({
      title: "Sucesso",
      description: "Nota atualizada com sucesso",
    });
  };

  const handleDragStart = (e: React.DragEvent, noteId: string) => {
    e.dataTransfer.setData("noteId", noteId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Note["status"]) => {
    e.preventDefault();
    const noteId = e.dataTransfer.getData("noteId");
    
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, status } : note
    ));

    toast({
      title: "Sucesso",
      description: "Nota movida com sucesso",
    });
  };

  const renderColumn = (status: Note["status"], title: string) => (
    <div
      className="flex-1 min-h-[500px] glass p-4 rounded-lg"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {notes
          .filter((note) => note.status === status)
          .map((note) => (
            <Card
              key={note.id}
              className="cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, note.id)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-base">
                  {note.title}
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingNote(note)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Nota</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <Input
                            value={editingNote?.title}
                            onChange={(e) =>
                              setEditingNote(
                                editingNote
                                  ? {
                                      ...editingNote,
                                      title: e.target.value,
                                    }
                                  : null
                              )
                            }
                            placeholder="Título da nota"
                          />
                          <Textarea
                            value={editingNote?.content}
                            onChange={(e) =>
                              setEditingNote(
                                editingNote
                                  ? {
                                      ...editingNote,
                                      content: e.target.value,
                                    }
                                  : null
                              )
                            }
                            placeholder="Conteúdo da nota"
                            className="min-h-[100px]"
                          />
                          <Button onClick={handleEditNote} className="w-full">
                            Salvar Alterações
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setNotes(notes.filter((n) => n.id !== note.id));
                        toast({
                          title: "Sucesso",
                          description: "Nota excluída com sucesso",
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{note.content}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  Criado em: {note.createdAt.toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="glass mb-6">
        <CardHeader>
          <CardTitle>Adicionar Nova Nota</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="Título da nota"
            />
            <Textarea
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              placeholder="Conteúdo da nota"
              className="min-h-[100px]"
            />
            <Button onClick={handleAddNote} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Nota
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderColumn("todo", "A Fazer")}
        {renderColumn("doing", "Em Andamento")}
        {renderColumn("done", "Concluído")}
      </div>
    </div>
  );
};

export default Notes;