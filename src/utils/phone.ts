export function normalizePhone(input: string): string {
  // Оставляем только цифры, добавь свою логику при необходимости
  return input.replace(/\D/g, '');
}
