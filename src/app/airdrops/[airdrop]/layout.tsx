import { ModalProvider } from "@/contexts/modal-context";

export default function Layout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ModalProvider>
      <>{modal}</>
      <>{children}</>
    </ModalProvider>
  );
}
