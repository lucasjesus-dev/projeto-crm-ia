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
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date(),
    };

    setNotes([...notes, note]);
    setNewNote({ title: "", content: "" });
    toast({
      title: "Success",
      description: "Note added successfully",
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
      title: "Success",
      description: "Note updated successfully",
    });
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    toast({
      title: "Success",
      description: "Note deleted successfully",
    });
  };

  return (
    <div className="container mx-auto p-6 animate-fadeIn">
      <Card className="glass mb-6">
        <CardHeader>
          <CardTitle>Add New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              placeholder="Note title"
            />
            <Textarea
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
              placeholder="Note content"
              className="min-h-[100px]"
            />
            <Button onClick={handleAddNote} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="glass">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
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
                        <DialogTitle>Edit Note</DialogTitle>
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
                          placeholder="Note title"
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
                          placeholder="Note content"
                          className="min-h-[100px]"
                        />
                        <Button onClick={handleEditNote} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Created: {note.createdAt.toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;