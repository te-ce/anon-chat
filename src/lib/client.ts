import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE ?? "http://localhost:3000";

export const client = treaty<App>(apiRoute).api;
