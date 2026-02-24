import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MoveRight, Smartphone } from "lucide-react";
import LoginLeftPanel from "./loginLeftPanel";
import { useForm } from "react-hook-form";
import {
  createUserLoginSchema,
  type createUserLoginFormData,
} from "@/validators/login-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/services/auth-services";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ErrorObject } from "@/api/model/error-model";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModule({ open, onOpenChange }: LoginDialogProps) {
  const form = useForm<createUserLoginFormData>({
    resolver: zodResolver(createUserLoginSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      if (response.status) {
        console.log(response);
        toast.success("Otp has been sent in your register mobile number", {
          duration: 2000,
        });
      }
      onOpenChange(false);
    },

    onError: (error: AxiosError<ErrorObject>) => {
      toast.error(`${error?.response?.data?.message}`, { duration: 5000 });
    },
  });

  const handleSubmit = (data: createUserLoginFormData) => {
    console.log("coming data", data);

    loginMutation.mutate(data);
  };

  const loadingState = loginMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden border-0 shadow-2xl rounded-3xl "
        style={{ maxWidth: "720px", fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="grid grid-cols-[1fr_1.1fr] min-h-105 ">
          {/* ─── LEFT PANEL ─── */}

          <LoginLeftPanel />

          {/* ─── RIGHT PANEL ─── */}
          <div className="relative flex flex-col justify-center bg-white px-9 py-10">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-title-darkblue mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground mb-7">
              Enter your details to access your account
            </p>

            {/* Mobile Number Label */}
            {/* <label className="text-sm font-medium text-gray-700 mb-2 block">
              Mobile Number
            </label> */}

            <Form {...form}>
              <form onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}>
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium text-gray-700 mb-1 block">
                        Mobile Number
                      </FormLabel>

                      <FormControl>
                        <div className="flex items-center gap-2 border rounded-md px-2 py-1 bg-gray-50 focus-within:ring-1 focus-within:ring-blue-500">
                          <Smartphone size={16} className="text-gray-400" />

                          <Input
                            type="tel"
                            placeholder="Enter your mobile number"
                            className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            {...field}
                          />
                        </div>
                      </FormControl>

                      {/* ✅ Reserve space ALWAYS */}
                      <div className="min-h-5 transition-opacity duration-200">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loadingState}
                  className="
                    w-full flex gap-2 justify-center items-center
                    px-3 sm:px-5 py-2 rounded-lg
                    bg-linear-to-r from-button-blue to-button-sky
                    text-white font-semibold
                    shadow-sm cursor-pointer
                    transition-colors duration-200
                    hover:from-blue-600 hover:to-blue-600 hover:shadow-md
                  "
                >
                  {loadingState && <Spinner className="mr-2" />}
                  Get OTP
                  <MoveRight className="w-4 sm:w-5" />
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="flex items-center gap-2.5 my-5 ">
              <div className="divider-line" />
              <span className="text-[11px] text-gray-400 tracking-widest font-medium whitespace-nowrap">
                OR CONTINUE WITH
              </span>
              <div className="divider-line" />
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center mb-6">
              {/* Google */}
              <button className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
            </div>

            {/* Terms */}
            <p className="text-center text-[11.5px] text-gray-400">
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
