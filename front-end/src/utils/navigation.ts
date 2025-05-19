import { LinkProps, router } from "expo-router";

export function redirectWithDelay(path: LinkProps['href'], seconds: number) {
  const delay = seconds * 1000;
  setTimeout(() => router.push(path), delay);
}