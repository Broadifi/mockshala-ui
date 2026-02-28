import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";
import {
  profileSchema,
  type ProfileFormData,
} from "@/validators/profile.schema";
import type { ErrorObject } from "@/api/model/error-model";
import type { RegistrationUser, User } from "@/api/model/auth-model";
import { authApi } from "@/api/services/auth-services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, User as UserIcon, Bookmark } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import { IMAGE_BASE_URL } from "@/api/url";
import { profileImage } from "@/assets";
import { INDIAN_STATES } from "@/utils/profile/indianStates";

// Type guard to check if user is User type (not RegistrationUser)
const isFullUser = (
  user: User | RegistrationUser | null | undefined,
): user is User => {
  return (
    user !== null &&
    user !== undefined &&
    "email" in user &&
    "gender" in user &&
    "city" in user
  );
};

// Format date for display (ISO string to YYYY-MM-DD)
const formatDateForForm = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return dateString || "";
  }
};

function ProfileModule() {
  const { userDetails, setUserDetails } = useAuthStore((state) => state.auth);
  const [activeTab, setActiveTab] = useState<"general" | "subscription">(
    "general",
  );

    useEffect(() => {
     
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  // Initialize form with proper type safety
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: userDetails?.name || "",
      email: userDetails?.email || "",
      mobile: userDetails?.mobile || "",
      dob: isFullUser(userDetails) ? formatDateForForm(userDetails.dob) : "",
      gender: isFullUser(userDetails) ? userDetails.gender : "",
      line1: isFullUser(userDetails) ? userDetails.line1 : "",
      line2: isFullUser(userDetails) ? userDetails.line2 : "",
      city: isFullUser(userDetails) ? userDetails.city : "",
      state: isFullUser(userDetails) ? userDetails.state : "",
      pinCode: isFullUser(userDetails) ? userDetails.pinCode : undefined,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (response) => {
      if (response.status && response.updated) {
        setUserDetails(response.data);

        toast.success("Profile updated successfully!", { duration: 3000 });
       
      }
    },
    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(
        `${error?.response?.data?.message || "Failed to update profile"}`,
        {
          duration: 5000,
        },
      );
    },
  });

  const handleSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate({
      email: data.email || undefined,
      name: data.name,
      mobile: data.mobile,
      dob: data.dob,
      gender: data.gender,
      line1: data.line1,
      line2: data.line2,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode,
    });
  };

  const profilePicUrl =
    isFullUser(userDetails) && userDetails.profilePicture
      ? userDetails.profilePicture.path
      : profileImage;

  const isLoading = updateProfileMutation.isPending;

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner className="mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="w-full container px-4 py-5 lg:pt-10 lg:pb-15 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {/* ─── LEFT SIDEBAR (Fixed) ─── */}
          <div className="md:col-span-4 xl:col-span-3 md:sticky md:top-8 md:h-fit">
            {/* Profile Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img
                    src={IMAGE_BASE_URL + profilePicUrl}
                    alt={profilePicUrl || "Profile Image"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    onError={(e) => {
                      e.currentTarget.src = profileImage;
                    }}
                  />
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 border-t pt-4">
                {/* Email */}
                {userDetails?.email && (
                  <div className="flex items-center  gap-3">
                    <Mail
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="text-[11px] font-semibold text-title-darkblue uppercase">
                        Email Address
                      </p>
                      <p className="text-sm text-gray-800 break-all">
                        {userDetails.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mobile */}
                {userDetails?.mobile && (
                  <div className="flex items-center gap-3 pt-2">
                    <Phone
                      size={18}
                      className="text-blue-500 mt-1 flex-shrink-0"
                    />
                    <div>
                      <p className="text-[11px] font-semibold text-title-darkblue uppercase">
                        Mobile Number
                      </p>
                      <p className="text-sm text-gray-800">
                        +91 {userDetails.mobile}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("general")}
                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "general"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <UserIcon size={20} />
                General Info
              </button>

              <button
                onClick={() => setActiveTab("subscription")}
                className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === "subscription"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Bookmark size={20} />
                Subscription Details
              </button>
            </div>
          </div>

          {/* ─── RIGHT CONTENT AREA ─── */}
          <div className="md:col-span-8 xl:col-span-9 bg-white rounded-lg shadow-sm p-6 sm:px-8">
            {activeTab === "general" ? (
              <>
                {/* Header */}

                <div className="text-center md:text-start space-y-1 lg:shrink-0 mb-8">
                  <h3 className="inline-block py-1 text-xl sm:text-2xl xl:text-4xl font-bold bg-linear-to-r from-title-gradient-blue to-title-gradient-sky bg-clip-text text-transparent">
                    Account Settings
                  </h3>

                  <p className="max-w-xl text-xs sm:text-sm xl:text-base text-gray-600 dark:text-gray-300">
                    View and update your personal profiles and contact
                    information.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      void form.handleSubmit(handleSubmit)(e);
                    }}
                  >
                    {/* Personal Details Section */}
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <UserIcon size={20} className="text-blue-600" />
                        Personal Details
                      </h2>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                        {/* Full Name */}

                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter full name"
                                  className="mt-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          {/* Date of Birth */}
                          <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Date of Birth{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className="w-full mt-2 justify-start text-left font-normal"
                                      >
                                        {field.value
                                          ? format(
                                              new Date(field.value),
                                              "dd/MM/yyyy",
                                            )
                                          : "Pick a date"}
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown"
                                      selected={
                                        field.value
                                          ? new Date(field.value)
                                          : undefined
                                      }
                                      onSelect={(date) => {
                                        if (date) {
                                          field.onChange(
                                            format(date, "yyyy-MM-dd"),
                                          );
                                        }
                                      }}
                                      disabled={(date) => date > new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Gender */}
                          <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold text-gray-700">
                                  Gender <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger className="mt-2">
                                      <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">
                                      Female
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phone Number */}
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Phone Number
                              </FormLabel>

                              <FormControl>
                                <Input
                                  placeholder="Enter phone number"
                                  readOnly
                                  {...field}
                                  className="
                                    mt-2
                                    bg-gray-100
                                    text-gray-500
                                    cursor-not-allowed
                                    opacity-80
                                    focus-visible:ring-0
                                    focus-visible:ring-offset-0
                                    "
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email Address */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter email address"
                                  className="mt-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Communication Address Section */}
                    <div className="mb-8 border-t pt-8">
                      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        📍 Communication Address
                      </h2>

                      <div className="grid grid-cols-1 gap-6 mb-6">
                        {/* Address Line 1 */}
                        <FormField
                          control={form.control}
                          name="line1"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Address Line 1{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter address line 1"
                                  className="mt-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Address Line 2 */}
                        <FormField
                          control={form.control}
                          name="line2"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Address Line 2{" "}
                                <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter address line 2"
                                  className="mt-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* State */}
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                State <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value || ""}
                              >
                                <FormControl>
                                  <SelectTrigger className="mt-2">
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[300px]">
                                  {INDIAN_STATES.map((state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* City */}
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                City <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter city"
                                  className="mt-2"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Pincode */}
                        <FormField
                          control={form.control}
                          name="pinCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-700">
                                Pincode <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter pincode"
                                  className="mt-2"
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? parseInt(e.target.value, 10)
                                      : undefined;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Update Button */}
                    <div className="flex flex-col gap-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full"
                      >
                        {isLoading && <Spinner className="mr-2 w-4 h-4" />}✓
                        Update Profile
                      </Button>

                      <p className="text-center text-xs text-gray-500">
                        All information is securely stored according to our
                        privacy policy.
                      </p>
                    </div>
                  </form>
                </Form>
              </>
            ) : (
              // Subscription Details Tab (Empty for now)
              <div className="py-12 text-center">
                <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Subscription Details
                </h2>
                <p className="text-gray-500">
                  Your subscription information will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModule;
