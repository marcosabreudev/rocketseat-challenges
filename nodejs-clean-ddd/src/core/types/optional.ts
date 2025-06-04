/**
 * Make some property optional and type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 */

export type Option<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
