import { cn } from "@/shared/lib/utils";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import * as React from "react";
import { Input } from "./input";

interface PasswordInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  error?: boolean;
  errorMessage?: string;
}

function PasswordInput({ className, error = false, errorMessage, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          data-slot="input"
          className={cn(className)}
          aria-invalid={error}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "text-muted-foreground hover:text-foreground absolute top-0 right-0 h-full cursor-pointer border-l px-3 transition-colors",
            error && "border-l-red-500"
          )}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeIcon size={20} /> : <EyeClosedIcon size={20} />}
        </button>
      </div>

      {error && errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}
    </>
  );
}

export { PasswordInput };
