interface ServerResponseProps {
  status: boolean;
  message: string;
  data?: object | null;
}

export function ServerResponse({
  status,
  message,
  data = null,
}: ServerResponseProps) {
  return { status, message, data };
}
