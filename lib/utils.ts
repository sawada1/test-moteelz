import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const swiperBreakpoints = {
  300: { slidesPerView: 1 },
  500: { slidesPerView: 2 },
  700: { slidesPerView: 3 },
  1024: { slidesPerView: 4 },
};

export const formatReadableDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

export const formatDateInArabic = (date: string): string => {
  try {
    if (!date) throw new Error("Date is empty or undefined");

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) throw new Error("Invalid date format");

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    // Format date in Arabic locale
    return new Intl.DateTimeFormat("ar-EG", options).format(parsedDate);
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid date";
  }
};


export function getChildrenLabel(
  childrenCount: number,
  $t: (key: string) => string
): string {
  // Check if childrenCount is 1 to return label without the number
  if (childrenCount === 1) {
    return $t("content.child");
  }

  if (childrenCount === 2) {
    return $t("content.twoChildren");
  }

  // For counts other than 1, include the count with the label
  const label = childrenCount <= 10 ? $t("content.childes") : $t("content.child");
  return `${childrenCount} ${label}`;
}


export function getAdultLabel(adultCount: number, $t: (key: string) => string): string {
  // Check if adultCount is 1 to return label without the number
  if (adultCount === 1) {
    return $t("content.adult");
  }

  // For counts other than 1, include the count with the label
  const label = adultCount <= 10 ? $t("content.adults") : $t("content.adult");
  return `${adultCount} ${label}`;
}
