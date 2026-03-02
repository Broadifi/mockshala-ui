import type { GetProfileData } from "./auth-model";

type RawUser = Partial<GetProfileData> & {
  _id: string;
};

type NormalizeUserInput =
  | RawUser
  | {
      user: RawUser;
    };

export const normalizeUser = (
  input: NormalizeUserInput
): GetProfileData => {
  const user = "user" in input ? input.user : input;

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