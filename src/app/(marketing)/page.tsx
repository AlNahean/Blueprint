"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTodo }),
    });

    if (response.ok) {
      const addedTodo = await response.json();
      setTodos([addedTodo, ...todos]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });

    if (response.ok) {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <section className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
              />
              <Button type="submit">Add</Button>
            </form>

            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Icons.spinner className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center gap-3 rounded-md p-3 bg-muted/50"
                  >
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() =>
                        handleToggleTodo(todo.id, todo.completed)
                      }
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={cn(
                        "flex-grow cursor-pointer",
                        todo.completed && "line-through text-muted-foreground"
                      )}
                    >
                      {todo.title}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="h-8 w-8"
                    >
                      <Icons.trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}