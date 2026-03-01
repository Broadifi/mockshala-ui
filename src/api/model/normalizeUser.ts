import type { GetProfileData } from "./auth-model";

export const normalizeUser = (input: any): GetProfileData => {
  // Handle both shapes:
  // login/register → input.user
  // profile/update → input directly
  const user = input.user ?? input;

  return {
    _id: user._id,
    email: user.email ?? "",
    name: user.name ?? "",
    mobile: user.mobile ?? "",
    country: user.country ?? "",

    isRegistered: user.isRegistered ?? false,
    registeredBy: user.registeredBy ?? "",
    isPasswordExist: user.isPasswordExist ?? false,
    isEmailVerified: user.isEmailVerified ?? false,

    // optional safe fields
    profilePicture: user.profilePicture ?? undefined,
    line1: user.line1 ?? "",
    line2: user.line2 ?? "",
    googleId: user.googleId ?? "",
    city: user.city ?? "",
    state: user.state ?? "",
    dob: user.dob ?? "",
    gender: user.gender ?? "",
    pinCode: user.pinCode ?? undefined,
    selectedExamCategories: user.selectedExamCategories ?? undefined,
    deviceToken: user.deviceToken ?? "",
  };
};