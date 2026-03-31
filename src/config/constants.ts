/**
 * Application Constants
 */

export const ROLES = {
  ADMIN: 'admin' as const,
  USER: 'user' as const,
  VENDOR: 'vendor' as const,
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending' as const,
  CONFIRMED: 'confirmed' as const,
  SHIPPED: 'shipped' as const,
  DELIVERED: 'delivered' as const,
  CANCELLED: 'cancelled' as const,
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  REFUNDED: 'refunded' as const,
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  OUT_OF_STOCK: 'out_of_stock' as const,
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];
