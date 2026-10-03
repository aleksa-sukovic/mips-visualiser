import { Injectable } from "@angular/core";

type ToastType = "error" | "info" | "success" | "warning";

@Injectable({
    providedIn: "root",
})
export class ToastService {
    private readonly timeout = 5000;

    public success(message: string): void {
        this.show(message, "success");
    }

    public error(message: string): void {
        this.show(message, "error");
    }

    public warning(message: string): void {
        this.show(message, "warning");
    }

    public info(message: string): void {
        this.show(message, "info");
    }

    private show(message: string, type: ToastType): void {
        const container = this.getContainer();
        const toast = document.createElement("div");

        toast.className = `ngx-toastr toast-${type}`;
        toast.textContent = message;
        toast.setAttribute("role", type === "error" ? "alert" : "status");
        toast.setAttribute("aria-live", type === "error" ? "assertive" : "polite");
        toast.addEventListener("click", () => toast.remove(), { once: true });
        container.appendChild(toast);

        window.setTimeout(() => toast.remove(), this.timeout);
    }

    private getContainer(): HTMLElement {
        const existing = document.querySelector<HTMLElement>(".toast-container");
        if (existing) return existing;

        const container = document.createElement("div");
        container.className = "toast-container toast-top-right";
        container.setAttribute("aria-atomic", "false");
        document.body.appendChild(container);

        return container;
    }
}
