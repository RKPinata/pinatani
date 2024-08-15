import { Colors } from "@lib/constants";

export type Color = (typeof Colors)[keyof typeof Colors];
