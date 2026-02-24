import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/services/auth-services";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ErrorObject } from "@/api/model/error-model";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { mockShalaLogo } from "@/assets";
import { ImageWithFallback } from "@/modules/fallback/ImageWithFallback";

import LoginLeftPanelOtp from "./loginLeftPanelOtp";
import { useForm } from "react-hook-form";
import { otpSchema, type OtpFormData } from "@/validators/login-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OtpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mobileNumber: string;
}

export function LoginWithOtp({
  open,
  onOpenChange,
  mobileNumber,
}: OtpDialogProps) {
  const [resendTimer, setResendTimer] = useState(0);
  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  //Schema for form validation
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { mobile: mobileNumber || "", otp: "" },
  });

  // Set mobile number when component mounts or mobileNumber changes
  useEffect(() => {
    if (mobileNumber) {
      form.setValue("mobile", mobileNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumber]);

  // Start resend timer automatically when OTP dialog opens
  useEffect(() => {
    if (open) {
      // Reset OTP form when dialog opens
      form.reset({ mobile: mobileNumber, otp: "" });

      // Clear any existing timer
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }

      // Start timer automatically (30 seconds)
      setResendTimer(30);
      resendTimerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup function - clear timer when dialog closes or component unmounts
    return () => {
      console.log("Cleanup: Clearing timer", resendTimerRef.current);
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
    };
  }, [open, mobileNumber, form]);

  //   OTP Verification
  const verifyOtpMutation = useMutation({
    mutationFn: authApi.otpVerification,
    onSuccess: (response) => {
      if (response.status) {
        window.localStorage.setItem("USER_TOKEN", response.data.token);
        toast.success("Login successful!", {
          duration: 3000,
        });

        onOpenChange(false);
      } else {
        toast.error("Login failed. Please try again.", { duration: 5000 });
      }
    },

    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    },
  });

  //   Resend OTP
  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      return authApi.login({ mobile: mobileNumber });
    },
    onSuccess: (response) => {
      if (response.status) {
        toast.success("OTP resent to your mobile number", {
          duration: 2000,
        });

        // Clear any existing timer before starting a new one
        if (resendTimerRef.current) {
          clearInterval(resendTimerRef.current);
          resendTimerRef.current = null;
        }

        // Start timer again (30 seconds)
        setResendTimer(30);
        resendTimerRef.current = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              if (resendTimerRef.current) {
                clearInterval(resendTimerRef.current);
                resendTimerRef.current = null;
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    },

    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    },
  });

  const handleSubmit = (data: OtpFormData) => {
    if (data.otp.length === 4) {
      // Include mobile number in the mutation call
      verifyOtpMutation.mutate(data);
    } else {
      toast.error("Please enter a valid 4-digit OTP", { duration: 3000 });
    }
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      resendOtpMutation.mutate();
    }
  };

  const loadingState = verifyOtpMutation.isPending;
  const resendLoading = resendOtpMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden border-0 shadow-2xl rounded-2xl sm:rounded-3xl w-[95vw] sm:w-full"
        style={{ maxWidth: "720px", fontFamily: "'DM Sans', sans-serif" }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>OTP Verification</DialogTitle>
          <DialogDescription>
            Enter the OTP sent to your registered mobile number
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] min-h-auto md:min-h-105">
          {/* ─── LEFT PANEL (Static, no animations) ─── */}
          <LoginLeftPanelOtp />

          {/* ─── RIGHT PANEL ─── */}
          <div className="relative flex flex-col justify-center bg-white px-5 sm:px-9 py-8 sm:py-10 min-h-auto sm:min-h-105">
            {/* Logo for mobile */}
            <div className="flex md:hidden pb-6 pt-1">
              <ImageWithFallback
                src={mockShalaLogo}
                alt="mockShalaLogo"
                className="h-8 w-auto"
              />
            </div>

            {/* Heading with emoji */}
            <h2 className="text-xl sm:text-2xl font-bold text-title-darkblue mb-2">
              Welcome Back 👋
            </h2>

            <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
              Enter the 4 digit OTP sent to your mobile number.
            </p>

            {/* Mobile Number Display */}
            <div className="mb-6">
              <label className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 block">
                <span className="text-red-700">*</span> Mobile Number
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm sm:text-base">
                {mobileNumber}
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-6 ">
              <Form {...form}>
                <form
                  onSubmit={(e) => {
                    void form.handleSubmit(handleSubmit)(e);
                  }}
                >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem className="mb-8">
                        <FormLabel className="text-xs sm:text-sm font-semibold text-gray-800 block">
                          <span className="text-red-700">*</span> OTP
                        </FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={4}
                            {...field}
                            containerClassName="flex gap-4 "
                          >
                            <InputOTPGroup>
                              <InputOTPSlot
                                className="data-[active=true]:border-blue-500"
                                index={0}
                              />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot
                                className="data-[active=true]:border-blue-500"
                                index={1}
                              />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot
                                className="data-[active=true]:border-blue-500"
                                index={2}
                              />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot
                                className="data-[active=true]:border-blue-500"
                                index={3}
                              />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={loadingState}
                    className="
                        w-full flex gap-2 justify-center items-center
                        px-3 sm:px-5 py-2.5 sm:py-3 rounded-full
                        bg-linear-to-r from-button-blue to-button-sky
                        text-white text-sm sm:text-base font-semibold
                        shadow-sm cursor-pointer
                        transition-all duration-200
                        hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                        disabled:opacity-50 disabled:cursor-not-allowed
                        active:scale-95 sm:active:scale-100
                    "
                  >
                    {loadingState && <Spinner className="mr-2" />}
                    Verify & Sign In
                  </Button>
                </form>
              </Form>
            </div>

            {/* Resend OTP Button */}
            <div className="mb-6 sm:mb-8 flex gap-3">
              <span className="text-xs text-muted-foreground">
                Didn&apos;t receive the code ?
              </span>

              <button
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || resendLoading}
                className="text-xs text-button-blue font-semibold hover:underline disabled:text-gray-400 cursor-pointer
                 disabled:cursor-not-allowed transition-colors"
              >
                {resendLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner className="w-3 h-3" />
                    Resending...
                  </div>
                ) : resendTimer > 0 ? (
                  `Resend OTP in ${resendTimer}s`
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>

            {/* Terms */}
            <p className="text-center text-[10px] sm:text-[11.5px] text-gray-400 mt-6 sm:mt-7">
              By joining, you agree to our{" "}
              <a href="#" className="text-blue-500 font-medium hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 font-medium hover:underline">
                Privacy
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
