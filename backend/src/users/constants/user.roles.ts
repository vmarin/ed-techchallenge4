export const USER_ROLES = ['teacher', 'student'] as const;

export type UserRole = (typeof USER_ROLES)[number];
