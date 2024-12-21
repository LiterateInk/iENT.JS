export const ProfileKind = {
  Parent: 1,
  Student: 2,
  Enterprise: 3
} as const;

export type ProfileKind = typeof ProfileKind[keyof typeof ProfileKind];
