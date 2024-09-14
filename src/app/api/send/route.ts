import Email from "@/components/Checkout/Email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, receipt } = await req.json();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json(
      { message: "Please enter a valid email", name: "bad_request" },
      { status: 400 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: "Penn Course Cart <no-reply@penncoursecart.app>",
      to: [email],
      subject: "Thanks for checking out!",
      react: Email({
        receipt: JSON.parse(receipt),
      }),
    });

    if (error) {
      return Response.json(error);
    }

    return Response.json(
      { message: "Receipt sent!", name: "success" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Server error", name: "server_error" },
      { status: 500 }
    );
  }
}
