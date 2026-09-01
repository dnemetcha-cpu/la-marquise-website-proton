"use client";

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { site } from "@/lib/site";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("La Marquise render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: "grid", minHeight: "100vh", placeItems: "center", background: "#f5f0e9", color: "#27211b", fontFamily: "Helvetica, Arial, sans-serif", textAlign: "center", padding: 32 }}>
          <div style={{ maxWidth: 460 }}>
            <div style={{ fontSize: 40 }}>La <em style={{ color: "#b18a5a", fontStyle: "italic" }}>Marquise</em></div>
            <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "18px 0 8px" }}>Something went wrong.</h1>
            <p style={{ color: "#746a60", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
              Please refresh the page to try again. For reservations, you can always reach us by phone.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{ background: "#5a1820", color: "#fff", border: 0, padding: "14px 26px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Reload page
            </button>
            <div style={{ marginTop: 26, fontSize: 14 }}>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} style={{ color: "#5a1820", fontWeight: 600, textDecoration: "none" }}>
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
