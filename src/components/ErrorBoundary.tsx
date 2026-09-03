"use client";

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { logger } from "@/lib/logger";
import { site } from "@/lib/site";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Log to structured logger for production monitoring
    logger.error("React Error Boundary caught an error", error, {
      componentStack: info.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "grid",
            minHeight: "100vh",
            placeItems: "center",
            background: "#f5f0e9",
            color: "#27211b",
            fontFamily: "Helvetica, Arial, sans-serif",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div style={{ maxWidth: 460 }}>
            <div style={{ fontSize: 40 }}>
              La <em style={{ color: "#b18a5a", fontStyle: "italic" }}>Marquise</em>
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 28, margin: "18px 0 8px" }}>
              Something went wrong.
            </h1>
            <p style={{ color: "#746a60", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
              Please refresh the page to try again. For reservations, you can always reach us by phone.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#5a1820",
                color: "#fff",
                border: 0,
                padding: "14px 26px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                marginRight: "12px",
              }}
            >
              Reload page
            </button>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              style={{
                display: "inline-block",
                background: "#d4af37",
                color: "#333",
                padding: "14px 26px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                marginLeft: "12px",
              }}
            >
              Call Us
            </a>
            <div style={{ marginTop: 26, fontSize: 14 }}>
              <p style={{ color: "#746a60", margin: 0 }}>
                Need help? Contact us at{" "}
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} style={{ color: "#5a1820", fontWeight: 600, textDecoration: "none" }}>
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: "40px", maxWidth: "600px", textAlign: "left", fontSize: "12px" }}>
              <summary style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "8px", color: "#5a1820" }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  background: "#f0f0f0",
                  padding: "12px",
                  borderRadius: "4px",
                  overflow: "auto",
                  fontSize: "12px",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  color: "#333",
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
