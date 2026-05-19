import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, Send, CheckCircle2, Loader2 } from "lucide-react";

const EMAILJS_SERVICE_ID  = "service_z2ddmb8";
const EMAILJS_TEMPLATE_ID = "template_sv677wd";
const EMAILJS_PUBLIC_KEY  = "UrufrW_Vekvvn3BBd";

export function ContactDialog({ trigger }: { trigger: React.ReactNode }) {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");

  const reset = () => { setSent(false); setError(""); setName(""); setEmail(""); setMessage(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          to_name: "Mohammed Musaib",
          reply_to: email,
          message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSent(true);
    } catch {
      setError("Transmission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(o) => { if (!o) reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-surface border-primary/30 sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 font-mono text-xs text-primary">
            <Terminal className="h-3.5 w-3.5" />
            <span>~/contact $ ./establish_link.sh</span>
          </div>
          <DialogTitle className="font-mono text-xl">Establish Secure Link</DialogTitle>
          <DialogDescription className="font-mono text-xs">
            Encrypted channel · End-to-end · 0 logs
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-signal" />
            <p className="font-mono text-sm text-foreground">Transmission successful.</p>
            <p className="font-mono text-xs text-muted-foreground">Message delivered to secure inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">{"> sender_name"}</label>
              <Input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="font-mono bg-background border-border focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">{"> return_email_address"}</label>
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="font-mono bg-background border-border focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-xs text-muted-foreground">{"> encrypted_message"}</label>
              <Textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                placeholder="Type your payload..."
                className="font-mono bg-background border-border focus-visible:ring-primary"
              />
            </div>
            {error && <p className="font-mono text-xs text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full font-mono bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Transmitting..." : "Transmit Message"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
