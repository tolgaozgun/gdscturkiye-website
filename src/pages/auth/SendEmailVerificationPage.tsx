import { Center } from "@mantine/core";
import SendEmailVerificationForm from "../../components/forms/auth/SendEmailVerificationForm";
import { useSearchParams } from "react-router-dom";

export function SendEmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Center sx={{ height: "60vh" }}>
      <SendEmailVerificationForm email={email} />
    </Center>
  );
}
export default SendEmailVerificationPage;
