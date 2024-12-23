"use client";

import { Button, Paragraph, Title } from "@/components";
import routes from "@/constants/routes";
import { useRouter } from "next/navigation";

interface ErrorProps {
  statusCode?: number;
  message?: string;
}

export default function Errors({ statusCode, message }: ErrorProps) {
  const router = useRouter();

  const getErrorMessage = () => {
    if (message) return message;

    switch (statusCode) {
      case 404:
        return "Page Not Found";
      case 500:
        return "Internal Server Error";
      default:
        return "An unexpected error has occurred";
    }
  };

  return (
    <>
      <Title level={1}>{statusCode || "Unknown"}</Title>
      <Paragraph>{getErrorMessage()}</Paragraph>
      <Button onClick={() => router.push(routes.TEST_SURVEY)}>
        Restart Survey
      </Button>
    </>
  );
}
