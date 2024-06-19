import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";
import VerificationEmail from "../../email/VerificationEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string // ye opt ka hi name hai
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Next App | Verification code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.log("*---- ERROR SENDING EMAIL ----*");

    return {
      success: false,
      message: "Error sending verification email.",
    };
  }
}
