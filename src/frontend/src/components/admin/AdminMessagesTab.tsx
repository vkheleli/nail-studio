import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Mail, MessageSquare, Scissors, User } from "lucide-react";
import { useContactMessages } from "../../hooks/useContactInfo";
import type { ContactMessage } from "../../types";

function formatDate(timestamp: bigint) {
  const ms = Number(timestamp / 1_000_000n);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function MessageCard({ message }: { message: ContactMessage }) {
  return (
    <div
      data-ocid={`message-row-${message.id}`}
      className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-subtle hover:border-primary/20 transition-smooth"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-base text-foreground truncate">
              {message.name}
            </p>
            <p className="text-muted-foreground text-xs font-body truncate">
              {message.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {message.preferredService && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <Scissors className="w-3 h-3" />
              {message.preferredService}
            </Badge>
          )}
          <span className="text-muted-foreground text-xs font-body flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(message.createdAt)}
          </span>
        </div>
      </div>

      <div className="bg-muted/40 rounded-lg p-4">
        <p className="text-foreground font-body text-sm leading-relaxed whitespace-pre-line">
          {message.message}
        </p>
      </div>

      <a
        href={`mailto:${message.email}`}
        className="inline-flex items-center gap-1.5 text-primary text-sm font-body hover:underline"
        data-ocid={`message-reply-${message.id}`}
      >
        <Mail className="w-3.5 h-3.5" />
        Reply to {message.name}
      </a>
    </div>
  );
}

export function AdminMessagesTab() {
  const { data: messages, isLoading } = useContactMessages();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl text-foreground">
          Contact Messages
        </h2>
        {messages && messages.length > 0 && (
          <Badge variant="outline" className="font-body">
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : !messages?.length ? (
        <div
          data-ocid="messages-empty"
          className="bg-muted/40 border border-dashed border-border rounded-xl p-12 text-center space-y-3"
        >
          <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground font-body">
            No messages yet. They'll appear here when clients get in touch.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages
            .slice()
            .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            .map((message) => (
              <MessageCard key={message.id.toString()} message={message} />
            ))}
        </div>
      )}
    </div>
  );
}
