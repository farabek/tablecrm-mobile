export function asList<T>(data: { items: T[] } | T[]): T[] {
  return Array.isArray(data) ? data : data.items;
}
