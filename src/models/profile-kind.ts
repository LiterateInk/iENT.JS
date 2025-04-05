export const ProfileKind = {
  Enterprise: 3,
  Parent: 1,
  Student: 2
} as const;

export type ProfileKind = typeof ProfileKind[keyof typeof ProfileKind];
