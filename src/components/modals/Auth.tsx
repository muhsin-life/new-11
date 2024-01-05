import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, buttonVariants } from "../ui/button";
import { useLocale } from "../hooks/useLocale";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ResponsiveDialog } from "../ResponsiveDialog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validators/auth";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { AtSign, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Alert } from "../ui/alert";
import OtpInput from "react-otp-input";
import sendOTP from "@/helpers/api/sendOTP";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

interface TAuthTab {
  value: "auth" | "otp";
  title: string;
  credential_value?: string;
  credential_type?: "phone" | "email";
}

const authTabs: Record<"auth" | "otp", TAuthTab> = {
  auth: {
    value: "auth" as const,
    title: "Largest Pharmacy Network in the UAE",
  },
  otp: {
    value: "otp" as const,
    title: "Verify OTP",
  },
};

export const AuthModal = NiceModal.create(() => {
  const modal = useModal();
  //   const { SELECTED_COUNTRY_DETAILS, SELECTED_LANGUAGE_DETAILS } = useLocale();

//   const router = useRouter();
//   const { pathname, asPath, query } = router;

  const [tab, setTab] = useState(authTabs["auth"]);

  const signInUser = async (otpValue: string) => {
    debugger;
    const signInResult = await signIn("credentials", {
      value: [tab.credential_value],
      type: tab.credential_type,
      code: otpValue,
      redirect: false,
    });

    if (signInResult?.ok) {
      modal.hide();
    } else {
      toast.error(`Invalid OTP Entered`, {
        description: "Please Try Again !",
      });
    }
  };

  return (
    <ResponsiveDialog open={modal.visible} close={modal.hide}>
      <div className=" flex  flex-col items-center justify-center mb-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:left-8 md:top-8"
          )}
        ></Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:px-4">
          <div className="flex flex-col space-y-2 text-center items-center">
            <div className="shadow w-fit p-2 rounded-xl border">
              <Icons.mobileLogo className="mx-auto h-16 w-16" />
            </div>
            <h1 className="text-lg  font-medium ">{tab.title}</h1>
            {tab.value === "otp" ? (
              <p className="text-muted-foreground text-sm ">{`Code sent to ${tab.credential_value}`}</p>
            ) : null}
            <p className="text-slate-400 text-sm"></p>
          </div>
          {tab.value === "auth" ? (
            <UserAuthForm setTab={setTab} />
          ) : (
            <OTPForm signInUser={signInUser} />
          )}
        </div>
      </div>
    </ResponsiveDialog>
  );
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setTab: (tab: TAuthTab) => void;
}

type FormData = z.infer<typeof userAuthSchema>;

const UserAuthForm = ({ className, setTab, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState(false);

  const getSendOTPRequestBody = ({ phone, email }: FormData) => {
    if (phone && phone !== "") {
      return {
        phone: `971${phone}`,
      };
    } else if (email && email !== "") {
      return {
        email: email,
      };
    }
  };

  async function onSubmit(data: FormData) {
    debugger;
    setIsLoading(true);
    const value = getSendOTPRequestBody(data);

    // send otp

    const res = (await sendOTP(
      JSON.stringify(getSendOTPRequestBody(data))
    )) as SendOtp;

    if (res?.success) {
      setTab({
        ...authTabs["otp"],
        credential_value: value?.phone ?? value?.email,
        credential_type: value?.phone ? "phone" : "email",
      });
      toast.success(`OTP send Successfully`, {
        description: "OTP Send to your Device",
      });
    } else {
      toast.error(`Something went wrong.`, {
        description: "Your sign in request failed. Please try again.",
      });
    }

    setIsLoading(false);
  }

  const AUTH_PROVIDERS = [
    {
      type: "google",
      colorCode: "hover:text-blue-500",
      logo: Icons.google,
      onClick: () => {},
    },
    {
      type: "apple",
      colorCode: "hover:text-slate-500",
      logo: Icons.apple,
      onClick: () => () => {},
    },
    {
      type: "whatsapp",
      colorCode: "hover:text-green-500",
      logo: Icons.whatsapp,
      onClick: () => () => {},
    },
  ];

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <Tabs defaultValue="phone" className="w-full  ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={"phone"}>Using Phone</TabsTrigger>
              <TabsTrigger value={"email"}>Using Email</TabsTrigger>
            </TabsList>
            <TabsContent value="phone" className="h-full flex-1 ">
              <div className="grid gap-2 py-1.5">
                <Label className="" htmlFor="phone">
                  Enter Your Phone Number
                </Label>
                <div className=" flex gap-1">
                  <Button
                    variant={"outline"}
                    onClick={(e) => {
                      e.preventDefault();
                      setAlert(true);
                    }}
                    className="gap-1.5 flex items-center"
                  >
                    <Icons.aeFlag className="w-6 h-6 rounded-lg" />
                    <p className="text-sm font-semibold"> +971</p>
                  </Button>
                  <Input
                    id="phone"
                    placeholder="XXX-XXX-XXX"
                    autoCorrect="off"
                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={isLoading}
                    {...register("phone")}
                  />
                </div>
                {alert && (
                  <Alert
                    className="bg-red-50"
                    visible={alert}
                    message={
                      "Users with Non-UAE numbers can use other login method to continue"
                    }
                  />
                )}

                {errors?.phone && (
                  <Alert
                    className="bg-amber-50 border border-amber-100"
                    visible={errors?.phone ? true : false}
                    message={`+971${errors.phone.message}`}
                  />
                )}
              </div>
            </TabsContent>
            <TabsContent value="email" className="h-full flex-1 ">
              <div className="grid gap-2 py-1.5">
                <Label className="" htmlFor="email">
                  Enter Your Email Address
                </Label>
                <div className=" flex gap-1">
                  <div className="relative w-full">
                    <AtSign className="my-auto text-muted-foreground h-4 w-4 inset-y-0 left-0 absolute m-3" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoCorrect="off"
                      className="focus-visible:ring-0 ps-9 focus-visible:ring-offset-0"
                      disabled={isLoading}
                      {...register("email")}
                    />
                  </div>
                </div>

                {errors?.email && (
                  <Alert
                    className="bg-amber-50 border border-amber-100"
                    visible={errors?.email ? true : false}
                    message={errors.email?.message ?? ""}
                  />
                )}
              </div>
            </TabsContent>
          </Tabs>

          <button
            type="submit"
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            PROCEED
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm uppercase">
          <span className="bg-background px-3 text-muted-foreground">
            OR LOGIN WITH
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 justify-center">
        {AUTH_PROVIDERS.map((provider) => (
          <Button {...provider.onClick} variant={"outline"} size={"icon"}>
            <provider.logo className="w-5 h-5 text-slate-600" />
          </Button>
        ))}
      </div>

      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          Trouble Signing In?
        </Link>
      </p>
    </div>
  );
};

const OTPForm = ({
  signInUser,
}: {
  signInUser: (otpValue: string) => Promise<void>;
}) => {
  const [otp, setOtp] = useState("");

  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter !== 0) {
        setCounter((prevCounter) => prevCounter - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <OtpInput
        value={otp}
        onChange={(value) => {
          setOtp(value);
          if (value.length === 4) {
            signInUser(value);
          }
        }}
        numInputs={4}
        renderSeparator={<span className="mx-3"></span>}
        renderInput={(props) => (
          <Input
            {...props}
            className="bg-blue-50 border border-muted !max-w-[60px] h-[60px] !w-full rounded-lg text-xl font-semibold"
          />
        )}
      />

      <div className="flex flex-col gap-1 items-center">
        <p className="text-muted-foreground text-sm">Didn't Receive Code?</p>
        <Button
          variant={"link"}
          size={"sm"}
          className="font-semibold"
          disabled={counter > 0}
          onClick={() => setCounter(30)}
        >
          Request Again
        </Button>
        {counter > 0 && (
          <p className="text-muted-foreground text-sm">in {counter} sec</p>
        )}
      </div>
      <Button
        className="w-full tracking-wide"
        disabled={otp.length !== 4}
        onClick={() => signInUser(otp)}
      >
        VERIFY AND LOGIN
      </Button>
    </div>
  );
};
