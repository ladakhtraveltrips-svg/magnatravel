/**
 * Shared validation used by both the client form and the /api/enquiry route,
 * so the rules can never drift apart.
 */

export const LIMITS = {
  name: 80,
  email: 120,
  message: 1000,
  shortText: 60,
  maxTravellers: 99,
};

const INDIAN_MOBILE = /^[6-9]\d{9}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME = /^[\p{L}][\p{L}\s.'-]*$/u;

/** Strips spaces, dashes, a leading +91 / 91 / 0 and returns the 10-digit number. */
export function normalizeIndianMobile(value = "") {
  let digits = String(value).replace(/[\s\-()]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function isValidIndianMobile(value) {
  return INDIAN_MOBILE.test(normalizeIndianMobile(value));
}

export function isValidEmail(value) {
  return EMAIL.test(String(value).trim());
}

/** Today's date as YYYY-MM-DD in the visitor's local time (for <input type="date" min>). */
export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
}

/** React Hook Form rule objects. */
export const rules = {
  fullName: {
    required: "Please enter your full name",
    minLength: { value: 2, message: "Name must be at least 2 characters" },
    maxLength: { value: LIMITS.name, message: `Name must be under ${LIMITS.name} characters` },
    validate: (v) => NAME.test(v.trim()) || "Please use letters only",
  },
  mobile: {
    required: "Please enter your mobile number",
    validate: (v) => isValidIndianMobile(v) || "Enter a valid 10-digit Indian mobile number",
  },
  email: {
    maxLength: { value: LIMITS.email, message: "Email is too long" },
    validate: (v) => !v || isValidEmail(v) || "Enter a valid email address",
  },
  travelDate: {
    required: "Please select your travel date",
    validate: (v) => !v || v >= todayISO() || "Travel date cannot be in the past",
  },
  adults: {
    required: "Required",
    min: { value: 1, message: "At least 1 adult" },
    max: { value: LIMITS.maxTravellers, message: "Too many" },
  },
  children: {
    min: { value: 0, message: "Invalid" },
    max: { value: LIMITS.maxTravellers, message: "Too many" },
  },
  message: {
    maxLength: { value: LIMITS.message, message: `Please keep it under ${LIMITS.message} characters` },
  },
};

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

/**
 * Server-side validation. Returns { data, errors } where errors is an object
 * keyed by field name (empty when valid).
 */
export function validateEnquiry(input = {}) {
  const errors = {};
  const data = {
    fullName: clean(input.fullName, LIMITS.name),
    mobile: normalizeIndianMobile(input.mobile),
    email: clean(input.email, LIMITS.email),
    travelDate: clean(input.travelDate, 10),
    adults: Number.parseInt(input.adults, 10),
    children: Number.parseInt(input.children || 0, 10),
    destination: clean(input.destination, LIMITS.shortText),
    packageType: clean(input.packageType, LIMITS.shortText),
    days: clean(input.days, LIMITS.shortText),
    message: clean(input.message, LIMITS.message),
    source: clean(input.source, LIMITS.shortText),
  };

  if (data.fullName.length < 2 || !NAME.test(data.fullName)) errors.fullName = "Invalid name";
  if (!INDIAN_MOBILE.test(data.mobile)) errors.mobile = "Invalid Indian mobile number";
  if (data.email && !isValidEmail(data.email)) errors.email = "Invalid email";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.travelDate)) errors.travelDate = "Invalid travel date";
  if (!Number.isInteger(data.adults) || data.adults < 1 || data.adults > LIMITS.maxTravellers)
    errors.adults = "Invalid number of adults";
  if (!Number.isInteger(data.children) || data.children < 0 || data.children > LIMITS.maxTravellers)
    errors.children = "Invalid number of children";

  return { data, errors };
}
