// src/lib/utils/formatters.ts
import moment from 'moment'; // Import moment for date and time formatting

// --- Date Formatting ---

// Example: Formatting date for display in user profile or goals
export function formatDate(date: Date | string | number): string {
  if (!date) {
    return ''; // Return empty string if no date is provided
  }

  const dateMoment = moment(date); // Create a moment object
  return dateMoment.format('MMMM DD, YYYY'); // Format the date
}

// --- Number Formatting ---

// Example: Formatting weight value for display
export function formatWeight(weight: number): string {
  if (!weight || isNaN(weight)) {
    return ''; // Return empty string if weight is invalid
  }

  return weight.toFixed(1) + ' kg'; // Format weight with one decimal place and "kg"
}

// --- Currency Formatting ---

// Example: Formatting prices (not used in this MVP, but included for demonstration)
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (!amount || isNaN(amount)) {
    return ''; // Return empty string if amount is invalid
  }

  //  This requires an external library like Intl.NumberFormat
  //  Consider using a library for currency formatting, like 'intl-numberformat'
  //  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount);
}

// --- Other Formatting Functions ---

// Example: Capitalizing the first letter of a string
export function capitalize(str: string): string {
  if (!str) {
    return ''; // Return empty string if string is empty
  }

  return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize the first letter
}

// --- Error Handling ---

// Example: Throwing an error if a date is invalid
export function validateDate(date: Date | string | number): void {
  const dateMoment = moment(date); // Create a moment object
  if (!dateMoment.isValid()) {
    throw new Error('Invalid date format.'); // Throw an error if the date is invalid
  }
}