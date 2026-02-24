import { useRef, useState } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
}

export function OTPInput({ value, onChange, onComplete }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));

  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    const digit = newValue.replace(/[^\d]/g, "");

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    onChange(otpValue);

    // Move to next input if digit is entered
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all 4 digits are filled
    if (newOtp.every((val) => val !== "") && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Move to next input on arrow right
    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to previous input on arrow left
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {[0, 1, 2, 3].map((index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 transition-all"
          placeholder="0"
        />
      ))}
    </div>
  );
}