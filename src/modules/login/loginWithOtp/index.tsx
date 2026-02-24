import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
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

  //Schema for form validation
  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { mobile: mobileNumber, otp: "" },
  });

console.log(mobileNumber);

//   OTP Verification
  const verifyOtpMutation = useMutation({
    mutationFn: authApi.otpVerification,
    onSuccess: (response) => {
      if (response.status) {
        toast.success("Login successful!", {
          duration: 2000,
        });
      
        onOpenChange(false);
      }else{
         toast.error('Login failed. Please try again.', { duration: 5000 })
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
        // Start 60 second timer
        setResendTimer(10);
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
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
    console.log(form.getValues('otp'));
     
    console.log("otp verification",data);
    
    if (data.otp.length === 4) {
      verifyOtpMutation.mutate(data);
    } else {
      toast.error("Please enter a valid 4-digit OTP", { duration: 3000 });
    }
  };

//   function testCClick(){
//     console.log("workinmg");
    
//   }

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
            <div className="mb-6 sm:mb-8">
              <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                * Mobile Number
              </label>
              <div className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md bg-gray-50 text-gray-600 text-sm sm:text-base">
                {mobileNumber}
              </div>
            </div>

            {/* OTP Input */}
            <div className="mb-6 sm:mb-8">
              <Form {...form}>
                <form onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
                    >
                  <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="sr-only">
                          One-Time Password
                        </FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={4}
                            {...field}
                            // containerClassName='justify-between [&>[data-slot="input-otp-group"]>div]:w-12 [&>[data-slot="input-otp-group"]>div]:h-12 [&>[data-slot="input-otp-group"]>div]:text-lg [&>[data-slot="input-otp-group"]>div]:border-slate-200 [&>[data-slot="input-otp-group"]>div]:bg-white [&>[data-slot="input-otp-group"]>div]:text-slate-900'
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>

                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    // disabled={loadingState }
                    
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
            <div className="mb-6 sm:mb-8">
              <button
                onClick={handleResendOtp}
                disabled={resendTimer > 0 || resendLoading}
                className="text-sm text-blue-500 font-medium hover:underline disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
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
